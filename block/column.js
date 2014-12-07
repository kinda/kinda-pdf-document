"use strict";

var _ = require('lodash');
var Block = require('./');

var Column = Block.extend('Column', function() {
  this.setCreator(function(parent, options) {
    if (!options) options = {};
    this.parentBlock = parent;
    this.document = parent.document;
    this.width = options.width || 0;
    this.paddings = options.paddings || 0;
    this.x = parent.x;
  });

  Object.defineProperty(this, 'x', {
    get: function() {
      return this._x;
    },
    set: function(x) {
      this._x = x;
    }
  });

  Object.defineProperty(this, 'width', {
    get: function() {
      return this._width;
    },
    set: function(width) {
      this._width = width;
    }
  });
});

module.exports = Column;
