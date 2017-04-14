'use strict';

// src/services/game/hooks/createGame.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const dieRoll = require('../dieRoll');
const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const rolledDie = dieRoll();

    if (rolledDie >= 2 && rolledDie <= 6) {
      return hook.app.service('games').get(hook.id)
        .then(game => {
          const player = game.players.filter(function(obj){
            obj.playerId === hook.params.user._id;
          })[0]; //array
          player.roundTotal = player.roundTotal + rolledDie;
          game.players = Object.assign({},game.players,player);
          return hook;
        });
    };
    hook.data.dieRoll = rolledDie;
};
