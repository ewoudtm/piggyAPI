'use strict';

// src/services/game/hooks/createGame.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const dieRoll = require('../dieRoll');
const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);
debugger
  return function(hook) {

    hook.data.dieRoll = dieRoll();
  };
};
