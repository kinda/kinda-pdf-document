'use strict';

let Block = require('./');

let Column = Block.extend('Column', function() {
  this.creator = function(parent, options = {}) {
    this.row = parent;
    this.document = parent.document;
    this.width = options.width || 0;
    this.paddings = options.paddings || 0;
    this.x = parent.x;
  };

  Object.defineProperty(this, 'y', {
    get() {
      return this.row.y;
    }
  });

  Object.defineProperty(this, 'height', {
    get() {
      return this.row.height;
    },
    set(height) {
      this.row.height = height;
    }
  });
});

module.exports = Column;
