"use strict";

var _ = require('lodash');
var Block = require('./');

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
    }
  });

  Object.defineProperty(this, 'height', {
    get: function() {
      return this.row.height;
    },
    set: function(height) {
      this.row.height = height;
    }
  });
});

module.exports = Column;
