"use strict";

var _ = require('lodash');
var Component = require('./');
var TableHeader = require('./table-header');
var TableBody = require('./table-body');
var TableFooter = require('./table-footer');

/**
 * Class Table, extend from {@link module:kinda-document.Component Component}.
 * @class Table
 * @memberof module:kinda-document
 * @param {Object} options - Init options.
 * @param {Function} fn - Init function.
 * @example // how to create instance?
 * var instance = Table.create({}, function() {});
 */
var Table = Component.extend('Table', function() {
  this.defaults = {
    borderWidth: 0.25,
    borderColor: 'gray'
  };

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
      return this._borderWidth;
    },
    set: function(borderWidth) {
      this._borderWidth = borderWidth;
    }
  });

  Object.defineProperty(this, 'borderColor', {
    get: function() {
      return this._borderColor;
    },
    set: function(borderColor) {
      this._borderColor = borderColor;
    }
  });

  /**
   * Add a {@link module:kinda-document.TableHeader TableHeader}.
   * @function addHeader
   * @instance
   * @memberof module:kinda-document.Table
   * @param {object=} options - Init config options.
   * @param {function=} fn - Init function.
   * @throws {Error} Will throw an Error if invoke this method more than once.
   * @returns {TableHeader} {@link module:kinda-document.TableHeader TableHeader} instance.
   */
  this.addHeader = function(options, fn) {
    if (this._header) {
      throw new Error('a report cannot have more than one header');
    }
    this._header = TableHeader.create(this, options, fn);
    return this._header;
  };

  /**
   * Get {@link module:kinda-document.TableHeader TableHeader} instance.
   * @function getHeader
   * @instance
   * @memberof module:kinda-document.Table
   * @returns {TableHeader} {@link module:kinda-document.TableHeader TableHeader} instance.
   */
  this.getHeader = function() {
    return this._header;
  };

  /**
   * Add a {@link module:kinda-document.TableBody TableBody}.
   * @function addBody
   * @instance
   * @memberof module:kinda-document.Table
   * @param {object} options - Init config options.
   * @param {function} fn - Init function.
   * @returns {TableBody} {@link module:kinda-document.TableBody TableBody} instance
   * @throws {Error} Will throw an Error if invoke this method more than once.
   */
  this.addBody = function(options, fn) {
    if (this._body) {
      throw new Error('a report cannot have more than one body');
    }
    this._body = TableBody.create(this, options, fn);
    return this._body;
  };

  /**
   * Get {@link module:kinda-document.TableBody TableBody} instance.
   * @function getBody
   * @instance
   * @memberof module:kinda-document.Table
   * @returns {TableBody} {@link module:kinda-document.TableBody TableBody} instance.
   */
  this.getBody = function() {
    return this._body;
  };

  /**
   * Add a {@link module:kinda-document.TableFooter TableFooter}.
   * @function addFooter
   * @instance
   * @memberof module:kinda-document.Table
   * @param {object} options - Init config options.
   * @param {function} fn - Init function.
   * @returns {TableFooter} {@link module:kinda-document.TableFooter TableFooter} instance
   * @throws {Error} Will throw an Error if invoke this method more than once.
   */
  this.addFooter = function(options, fn) {
    if (this._footer) {
      throw new Error('a table cannot have more than one footer');
    }
    this._footer = TableFooter.create(this, options, fn);
    return this._footer;
  };

  /**
   * Get {@link module:kinda-document.TableFooter TableFooter} instance.
   * @function getFooter
   * @instance
   * @memberof module:kinda-document.Table
   * @returns {TableFooter} {@link module:kinda-document.TableFooter TableFooter} instance.
   */
  this.getFooter = function() {
    return this._footer;
  };

  this.computeColumnWidths = function(block) {
    block.document.addRow({ isFloating: true }, function(block) {
      var sumOfDefinedWidths = 0;
      var hasUndefinedWidth;
      this.columns.forEach(function(column) {
        if (column.width) {
          sumOfDefinedWidths += column.width;
          column.computedWidth = column.width;
        } else {
          hasUndefinedWidth = true;
        }
      });

      if (sumOfDefinedWidths > block.document.width) {
        throw new Error('defined column width is too big');
      }

      if (!hasUndefinedWidth) return;

      var rows = [];
      if (this.getBody()) {
        rows = rows.concat(this.getBody().rows);
      }
      if (this.getHeader()) {
        rows = rows.concat(this.getHeader().rows);
      }
      if (this.getFooter()) {
        rows = rows.concat(this.getFooter().rows);
      }

      var matrix = [];

      rows.forEach(function(row, rowIndex) {
        if (!matrix[rowIndex]) matrix[rowIndex] = [];
        row.cells.forEach(function(cell, columnIndex) {
          var options = { paddings: cell.paddings };
          block.addColumn(options, function(block) {
            var width = cell.computeWidth(block);
            matrix[rowIndex][columnIndex] = width;
          }.bind(this));
        });
      });

      var remainingTableWidth = block.document.width;
      var sumOfUnknownWidths = 0;

      this.columns.forEach(function(column, index) {
        var maxColumnWidth = _.max(matrix.map(function(row) {
          return row[index];
        }));
        column.maxWidth = maxColumnWidth;
        if (!column.width) {
          sumOfUnknownWidths += maxColumnWidth;
        } else {
          remainingTableWidth -= column.width;
        }
      }.bind(this));

      this.columns.forEach(function(column) {
        if (!column.width) {
          if (remainingTableWidth < sumOfUnknownWidths) {
            column.computedWidth = (
              column.maxWidth / sumOfUnknownWidths * remainingTableWidth
            );
          } else {
            column.computedWidth = column.maxWidth;
          }
        }
      }.bind(this));
    }.bind(this));
  };

  this.render = function(block) {
    this.computeColumnWidths(block);

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
