"use strict";

var _ = require('lodash');
var Component = require('../component');
var TableHeader = require('./table-header');
var TableBody = require('./table-body');
var TableFooter = require('./table-footer');

var Table = Component.extend('Table', function() {
  Object.defineProperty(this, 'columns', {
    get: function() {
      if (!this._columns) this._columns = [];
      return this._columns;
    },
    set: function(columns) {
      this._columns = columns;
    }
  });

  Object.defineProperty(this, 'borderWidth', {
    get: function() {
      return this._borderWidth || 1;
    },
    set: function(borderWidth) {
      this._borderWidth = borderWidth;
    }
  });

  Object.defineProperty(this, 'borderColor', {
    get: function() {
      return this._borderColor || 'grey';
    },
    set: function(borderColor) {
      this._borderColor = borderColor;
    }
  });

  this.addHeader = function(options, fn) {
    if (this._header) {
      throw new Error('a report cannot have more than one header');
    }
    this._header = TableHeader.create(this, options, fn);
  };

  this.getHeader = function() {
    return this._header;
  };

  this.addBody = function(options, fn) {
    if (this._body) {
      throw new Error('a report cannot have more than one body');
    }
    this._body = TableBody.create(this, options, fn);
  };

  this.getBody = function() {
    return this._body;
  };

  this.addFooter = function(options, fn) {
    if (this._footer) {
      throw new Error('a table cannot have more than one footer');
    }
    this._footer = TableFooter.create(this, options, fn);
  };

  this.getFooter = function() {
    return this._footer;
  };

  this.computeAllColumnWidth = function(block) {
    block.document.addRow({ isFloating: true }, function(block) {
      var restTableWidth = block.document.width;
      var sumOfUnknownWidth = 0;
      var sumOfMaxWidth = 0;
      var matrix = [];

      var sumOfKnownWidth = 0;
      var countOfUnknownColumn = 0;
      this.columns.forEach(function(column) {
        if (!column.width) {
          countOfUnknownColumn += 1;
        } else {
          sumOfKnownWidth += column.width;
        }
      });

      if (countOfUnknownColumn > 0 && sumOfKnownWidth > restTableWidth) {
        throw new Error('defined column width is too big');
      }

      var rows = this.getBody().rows;

      if (this.getHeader()) {
        rows = rows.concat(this.getHeader().rows);
      }

      if (this.getFooter()) {
        rows = rows.concat(this.getFooter().rows);
      }

      rows.forEach(function(row, rowIndex) {
        row.cells.forEach(function(cell, columnIndex) {
          if (!matrix[rowIndex]) {
            matrix[rowIndex] = [];
          }

          matrix[rowIndex][columnIndex] = cell.computeWidth(block) + cell.paddings.left + cell.paddings.right;
        });
      });

      this.columns.forEach(function(column, index) {
        var maxColumnWidth = _.max(matrix.map(function(row) {
          return row[index];
        }));

        this.columns[index].maxWidth = maxColumnWidth;
        if (!column.width) {
          sumOfUnknownWidth += maxColumnWidth;
        } else {
          restTableWidth -= column.width;
        }
      }.bind(this));

      this.columns.forEach(function(column, index) {
        if (restTableWidth < sumOfUnknownWidth) {
          if (!column.width) {
            this.columns[index].computedWidth = column.maxWidth / sumOfUnknownWidth * restTableWidth;
          } else {
            this.columns[index].computedWidth = column.maxWidth;
          }
        } else {
          this.columns[index].computedWidth = column.maxWidth;
        }
      }.bind(this));
    }.bind(this));
  };

  this.render = function(block) {
    var hasUndefinedWidth = _.some(this.columns, function(column) {
      return column.width == null;
    });
    if (hasUndefinedWidth) {
      this.computeAllColumnWidth(block);
    }

    var renderHeader;
    if (this.getHeader()) {
      renderHeader = function() {
        this.getHeader().render(block);
      }.bind(this);
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
