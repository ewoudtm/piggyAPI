'use strict';

// src/services/game/hooks/createGame.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const dieRoll = require('../dieRoll');
const defaults = {};

console.log('dieRoll called')

module.exports = function(options) {
  options = Object.assign({}, defaults, options);
  console.log('dieRoll inside function')
  return function(hook) {
    if (hook.data.rollDie === undefined) return;
    const rolledDie = dieRoll();

    if (rolledDie >= 2 && rolledDie <= 6) {
      return hook.app.service('games').get(hook.id)
        .then((game) => {
          game.players.forEach( function (player) {
            if (String(player.playerId) === String(hook.params.user._id)) {
              player.roundTotal = player.roundTotal + rolledDie;
            };
            return
          });
          game.dieRoll = rolledDie;
          let data = {};
          data = Object.assign({},game);
          hook.data = data

        });
    };
  };
};
