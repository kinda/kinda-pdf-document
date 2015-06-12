'use strict';

let Component = require('./');
let TableRow = require('./table-row');

let TableFooter = Component.extend('TableFooter', function() {
  this.defaults = {
    alignment: 'left'
  };

  Object.defineProperty(this, 'rows', {
    get() {
      if (!this._rows) this._rows = [];
      return this._rows;
    }
  });

  this.addRow = function(options, fn) {
    let row = TableRow.create(this, options, fn);
    this.rows.push(row);
    return row;
  };

  this.render = function(block) {
    this.rows.forEach(row => {
      block.addRow(undefined, rowBlock => {
        row.render(rowBlock);
      });
    });
  };
});

module.exports = TableFooter;
