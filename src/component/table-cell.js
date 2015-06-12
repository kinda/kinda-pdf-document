'use strict';

let Box = require('./box');

let TableCell = Box.extend('TableCell', function() {
  this.defaults = {
    paddings: 1.5
  };
});

module.exports = TableCell;
