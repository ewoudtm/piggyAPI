'use strict'

module.exports = function addDieToRoundTotal(game, die) {
  const current = game.currentPlayer;
  const playersArray = game.players;
  const addToRound = (die) => {
    const updatedPlayers = playersArray.map(function(obj) {
      if(obj.playerId === current.playerId){
        return Object.assign({},obj,{ obj.roundTotal: obj.roundTotal + die});
      }
      else {
        return obj;
      }
    })
  }
  return updatedPlayers;
}
