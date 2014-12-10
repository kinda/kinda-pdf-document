"use strict";

var _ = require('lodash');
var Box = require('./box');

/**
 * Class TableCell, extend from {@link module:kinda-document.Box Box}.
 * @class TableCell
 * @memberof module:kinda-document
 * @param {Object} options - Init options.
 * @param {Function} fn - Init function.
 * @example // how to create instance?
 * var instance = TableCell.create({}, function() {});
 */
var TableCell = Box.extend('TableCell', function() {
  this.defaults = {
    paddings: 1.5
  };
});

module.exports = TableCell;
