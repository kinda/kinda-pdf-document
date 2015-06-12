'use strict';

let _ = require('lodash');
let Component = require('./');
let TableHeader = require('./table-header');
let TableBody = require('./table-body');
let TableFooter = require('./table-footer');

let Table = Component.extend('Table', function() {
  this.defaults = {
    marginTop: 5,
    borderWidth: 0.25,
    borderColor: 'gray'
  };

  Object.defineProperty(this, 'columns', {
    get() {
      if (!this._columns) this._columns = [];
      return this._columns;
    },
    set(columns) {
      this._columns = columns;
    }
  });

  Object.defineProperty(this, 'borderWidth', {
    get() {
      return this._borderWidth;
    },
    set(borderWidth) {
      this._borderWidth = borderWidth;
    }
  });

  Object.defineProperty(this, 'borderColor', {
    get() {
      return this._borderColor;
    },
    set(borderColor) {
      this._borderColor = borderColor;
    }
  });

  this.addHeader = function(options, fn) {
    if (this._header) {
      throw new Error('a report cannot have more than one header');
    }
    this._header = TableHeader.create(this, options, fn);
    return this._header;
  };

  this.getHeader = function() {
    return this._header;
  };

  this.addBody = function(options, fn) {
    if (this._body) {
      throw new Error('a report cannot have more than one body');
    }
    this._body = TableBody.create(this, options, fn);
    return this._body;
  };

  this.getBody = function() {
    return this._body;
  };

  this.addFooter = function(options, fn) {
    if (this._footer) {
      throw new Error('a table cannot have more than one footer');
    }
    this._footer = TableFooter.create(this, options, fn);
    return this._footer;
  };

  this.getFooter = function() {
    return this._footer;
  };

  this.computeColumnWidths = function(block) {
    block.document.addRow({ isFloating: true }, rowBlock => {
      let sumOfDefinedWidths = 0;
      let hasUndefinedWidth;
      this.columns.forEach(column => {
        if (column.width) {
          sumOfDefinedWidths += column.width;
          column.computedWidth = column.width;
        } else {
          hasUndefinedWidth = true;
        }
      });

      if (sumOfDefinedWidths > rowBlock.document.width) {
        throw new Error('defined column width is too big');
      }

      if (!hasUndefinedWidth) return;

      let rows = [];
      if (this.getBody()) {
        rows = rows.concat(this.getBody().rows);
      }
      if (this.getHeader()) {
        rows = rows.concat(this.getHeader().rows);
      }
      if (this.getFooter()) {
        rows = rows.concat(this.getFooter().rows);
      }

      let matrix = [];

      rows.forEach(function(row, rowIndex) {
        if (!matrix[rowIndex]) matrix[rowIndex] = [];
        row.cells.forEach(function(cell, columnIndex) {
          let options = { paddings: cell.paddings };
          rowBlock.addColumn(options, columnBlock => {
            let width = cell.computeWidth(columnBlock);
            matrix[rowIndex][columnIndex] = width;
          });
        });
      });

      let remainingTableWidth = rowBlock.document.width;
      let sumOfUnknownWidths = 0;

      this.columns.forEach((column, index) => {
        let maxColumnWidth = _.max(matrix.map(function(row) {
          return row[index];
        }));
        column.maxWidth = maxColumnWidth;
        if (!column.width) {
          sumOfUnknownWidths += maxColumnWidth;
        } else {
          remainingTableWidth -= column.width;
        }
      });

      this.columns.forEach(column => {
        if (!column.width) {
          if (remainingTableWidth < sumOfUnknownWidths) {
            column.computedWidth = (
              column.maxWidth / sumOfUnknownWidths * remainingTableWidth
            );
          } else {
            column.computedWidth = column.maxWidth;
          }
        }
      });
    });
  };

  this.render = function(block) {
    if (block.y !== block.document.top) {
      // marginTop should be ignored when y is at the top of the page
      block.y += this.margins.top;
    }

    this.computeColumnWidths(block);

    let renderHeader;
    if (this.getHeader()) {
      renderHeader = () => {
        this.getHeader().render(block);
      };
      renderHeader();
      block.document.on('didAddPage', renderHeader);
    }

    if (this.getBody()) this.getBody().render(block);

    if (this.getFooter()) this.getFooter().render(block);

    if (renderHeader) {
      block.document.off('didAddPage', renderHeader);
    }
  };
});

module.exports.Table = Table;
