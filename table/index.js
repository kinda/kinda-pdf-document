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
    var restTableWidth = block.ptToMm(block.pdf.page.width) - 20; // hack for padding left && right
    var sumOfUnknownWidth = 0;
    var matrix = [];

    this.getBody().rows.forEach(function(row, rowIndex) {
      row.cells.forEach(function(cell, columnIndex) {
        if (!matrix[rowIndex]) {
          matrix[rowIndex] = [];
        }

        matrix[rowIndex][columnIndex] = block.ptToMm(cell.computeWidth(block));
      });
    });

    this.columns.forEach(function(column, index) {
      var maxColumnWidth = 0;
      if (!column.width) {
        maxColumnWidth = _.max(matrix.map(function(row) {
          return row[index];
        }));

        sumOfUnknownWidth += maxColumnWidth;
        this.columns[index].maxWidth = maxColumnWidth;
      } else {

        restTableWidth -= column.width;
      }
    }.bind(this));

    this.columns.forEach(function(column, index) {
      if (!column.width) {
        this.columns[index].computedWidth = column.maxWidth * restTableWidth / sumOfUnknownWidth;
      }
    }.bind(this));

    // console.log(this.columns);
  };

  this.render = function(block) {
    var isWidthUndefined = this.columns.some(function(column) {
      return !!column.width;
    });

    if (isWidthUndefined) {
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
