"use strict";

var _ = require('lodash');
var Component = require('./');
var TableRow = require('./table-row');

/**
 * Class TableBody, extend from {@link module:kinda-document.Component Component}.
 * @class TableBody
 * @memberof module:kinda-document
 * @param {Object} options - Init options.
 * @param {Function} fn - Init function.
 * @example // how to create instance?
 * var instance = TableBody.create({}, function() {});
 */
var TableBody = Component.extend('TableBody', function() {
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
   * @memberof module:kinda-document.TableBody
   * @instance
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

module.exports = TableBody;
