'use strict'

module.exports = function nextPlayer(game) {
  const current = game.currentPlayer;
  const currentIndex = game.players.indexOf(current);
  const numberOfPlayers = game.players.length;
  const indexNextPlayer = (currentIndex + 1) % numberOfPlayers;

  return game.players[indexNextPlayer];
}
