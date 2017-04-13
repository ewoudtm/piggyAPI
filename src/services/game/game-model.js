'use strict';

// game-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  players: [{
    playerId: Schema.Types.ObjectId,
    name: String,
    gameTotal: { type: Number, 'default': 0 },
    roundTotal: { type: Number, 'default': 0 }
    }],
  currentPlayer: Schema.Types.ObjectId,
  dieRoll: { type: Number, 'default': 0 },
  firstRound: { type: Boolean, 'default': true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const gameModel = mongoose.model('game', gameSchema);

module.exports = gameModel;
