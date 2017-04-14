'use strict';

const firstEncounter = require('./firstEncounter');
const isGameFull = require('./isGameFull');
const dieRoll = require('./dieRoll');
const joinGame = require('./joinGame');
const cash = require('./cash');
const createGame = require('./createGame');
const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [createGame()],
  update: [joinGame()],
  patch: [dieRoll(), cash()],
  remove: []
};

exports.after = {
  all: [isGameFull(), firstEncounter()],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
