"use strict";

var _ = require('lodash');
var Block = require('./');
var Column = require('./column');

/**
* Class Row, extend from {@link module:kinda-document.Block Block}.

* @class Row
* @memberof module:kinda-document
* @param {Block} parent - Parent of self.
* @param {Object} options - Init config options.
* @example how to create instance
* var instance = Row.create({}, function() {});
*/
var Row = Block.extend('Row', function() {
  this.setCreator(function(parent, options) {
    if (!options) options = {};
    this.document = parent;
    this.height = options.height || 0;
    this.isFloating = !!options.isFloating;
    this.x = parent.x;
    this.y = parent.y;
    this.width = parent.width;
    this.paddings = 0;
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
    var block = Column.create(this, options);
    fn(block);
    this.x += block.width;
  };
});

module.exports = Row;
