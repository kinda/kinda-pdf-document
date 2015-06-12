'use strict';

let Block = require('./');
let Column = require('./column');

let Row = Block.extend('Row', function() {
  this.creator = function(parent, options = {}) {
    this.document = parent;
    this.height = options.height || 0;
    this.isFloating = !!options.isFloating;
    this.x = parent.x;
    this.y = parent.y;
    this.width = parent.width;
    this.paddings = 0;
  };

  Object.defineProperty(this, 'height', {
    get() {
      return this._height;
    },
    set(height) {
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
    let block = Column.create(this, options);
    fn(block);
    this.x += block.width;
  };
});

module.exports = Row;
