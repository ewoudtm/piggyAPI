'use strict'

module.exports = function isGameWon(game) {
  const player = game.currentPlayer;

  return (player.roundTotal + player.gameTotal) >= 100;
}
