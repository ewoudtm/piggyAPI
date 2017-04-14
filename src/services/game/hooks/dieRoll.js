'use strict';

// src/services/game/hooks/createGame.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html
const errors = require('feathers-errors');
const dieRoll = require('../dieRoll');
const defaults = {};

console.log('dieRoll called')

module.exports = function(options) {
  options = Object.assign({}, defaults, options);
  console.log('dieRoll inside function')
  return function(hook) {
    if (hook.data.rollDie === undefined) return;
      console.log('after undefined')
      return hook.app.service('games').get(hook.id)
        .then((game) => {
            console.log('after then')

          const rolledDie = dieRoll();

          game.players.forEach( function (player) {
            if (player.player_id == hook.params.user._id && player.turn != true) {
              throw new errors.Forbidden('Its not your turn!');
            };

            if (rolledDie >= 2 && rolledDie <= 6) {
              if (String(player.playerId) === String(hook.params.user._id)) {
                player.roundTotal = player.roundTotal + rolledDie;
                console.log(player.roundTotal)
              };
              return
            };
          });

          if (rolledDie === 1) {
            game.players.forEach( function (player) {
              player.turn = !player.turn;
            });
          };

          game.dieRoll = rolledDie;
          let data = {};
          data = Object.assign({},game);
          hook.data = data

        });
  };
};
