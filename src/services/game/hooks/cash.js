'use strict';

// src/services/game/hooks/createGame.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    if (hook.data.cash === undefined) return;

      return hook.app.service('games').get(hook.id)
        .then((game) => {
          game.players.forEach( function (player) {
            if (String(player.playerId) === String(hook.params.user._id)) {
              player.gameTotal += player.roundTotal;
              player.roundTotal = 0;
            };
            return
          });
          let data = {};
          data = Object.assign({},game);
          hook.data = data
        });
  };
};
