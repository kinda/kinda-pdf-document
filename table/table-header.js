"use strict";

var _ = require('lodash');
var Component = require('../component');
var TableRow = require('./table-row');

var TableHeader = Component.extend('TableHeader', function() {
  Object.defineProperty(this, 'rows', {
    get: function() {
      if(!this._rows) this._rows = [];
      return this._rows;
    }
  });

  this.addRow = function(options, fn) {
    var row = TableRow.create(this, options, fn);
    this.rows.push(row);
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
