'use strict'

module.exports = function startingPlayer(game) {
  const numberOfPlayers = game.players.length;
  const random = Math.floor(Math.random() * numberOfPlayers) + 1;

  return game.players[random];
}
