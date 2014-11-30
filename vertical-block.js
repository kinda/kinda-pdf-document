"use strict";

var _ = require('lodash');
var Block = require('./block');
var HorizontalBlock = require('./horizontal-block');

var VerticalBlock = Block.extend('VerticalBlock', function() {
  this.setCreator(function(parent, options) {
    if (!options) options = {};
    this.parentBlock = parent;
    this.height = options.height || 0;
    this.isFloating = !!options.isFloating;
    this.padding = 0;
    this.resetPosition();
  });

  this.resetPosition = function() {
    this.x = this.parentBlock.x;
    this.y = this.parentBlock.y;
    this.width = this.parentBlock.width;
  };

  Object.defineProperty(this, 'x', {
    get: function() {
      return this._x;
    },
    set: function(x) {
      this._x = x;
    }
  });

  Object.defineProperty(this, 'y', {
    get: function() {
      return this._y;
    },
    set: function(y) {
      this._y = y;
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

  Object.defineProperty(this, 'height', {
    get: function() {
      return this._height;
    },
    set: function(height) {
      if (!this.isFloating) {
        // if page break
        if (this.y + height > this.document.top + this.document.height) {
          this.document.addPage();
          this.y = this.document.y;
        }
      }
      this._height = height;
    }
  });

  this.addColumn = function(options, fn) {
    var block = HorizontalBlock.create(this, options);
    fn(block);
    this.x += block.width;
    this.width -= block.width;
  };
});

module.exports = VerticalBlock;
