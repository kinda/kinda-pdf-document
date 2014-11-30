"use strict";

var _ = require('lodash');
var Box = require('../box');

var TableCell = Box.extend('TableCell', function() {
  this.defaults = {
    padding: 1.5
  };
});

module.exports = TableCell;
