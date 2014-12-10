"use strict";

var _ = require('lodash');
var Component = require('./');
var TableRow = require('./table-row');

/**
 * Class TableHeader, extend from {@link module:kinda-document.Component Component}.
 * @class TableHeader
 * @memberof module:kinda-document
 * @param {Object} options - Init options.
 * @param {Function} fn - Init function.
 * @example // how to create instance?
 * var instance = TableHeader.create({}, function() {});
 */
var TableHeader = Component.extend('TableHeader', function() {
  this.defaults = {
    alignment: 'left'
  };

  Object.defineProperty(this, 'rows', {
    get: function() {
      if(!this._rows) this._rows = [];
      return this._rows;
    }
  });

  /**
   * Add a {@link module:kinda-document.TableRow TableRow} instance to self.
   *
   * @function addRow
   * @instance
   * @memberof module:kinda-document.TableBody
   * @param {Object=} options - Init config options.
   * @param {Function} fn - Init function.
   * @returns {TableRow} {@link module:kinda-document.TableRow TableRow} instance
   */
  this.addRow = function(options, fn) {
    var row = TableRow.create(this, options, fn);
    this.rows.push(row);
    return row;
  };

  this.render = function(block) {
    this.rows.forEach(function(row) {
      block.addRow(undefined, function(block) {
        row.render(block);
      }.bind(this));
    }.bind(this));
  };
});

module.exports = TableHeader;
