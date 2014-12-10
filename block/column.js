"use strict";

var _ = require('lodash');
var Block = require('./');

/**
 * Class Column, extend from {@link module:kinda-document.Block Block}.
 * 
 * @class Column
 * @memberof module:kinda-document
 * @param {Block} parent - Parent of self.
 * @param {Object} options - Init config options.
 * @example // how to create instance?
 * var instance = Column.create({}, function() {});
 */
var Column = Block.extend('Column', function() {
  this.setCreator(function(parent, options) {
    if (!options) options = {};
    this.row = parent;
    this.document = parent.document;
    this.width = options.width || 0;
    this.paddings = options.paddings || 0;
    this.x = parent.x;
  });

  Object.defineProperty(this, 'y', {
    get: function() {
      return this.row.y;
    },
    set: function(y) {
      this.row.y = y;
    }
  });

  Object.defineProperty(this, 'height', {
    get: function() {
      return this.row.height;
    },
    set: function(height) {
      this.row.height = height;
    },
    configurable: true
  });
});

module.exports = Column;
