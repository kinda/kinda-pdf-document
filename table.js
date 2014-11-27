"use strict";

var _ = require('lodash');
var misc = require('./misc');
var Component = require('./component');
var TableHeader = require('./table-header');
var TableBody = require('./table-body');

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

  this.render = function(block) {
    var renderHeader;
    if (this.getHeader()) {
      renderHeader = function() {
        this.getHeader().render(block);
      }.bind(this);
      renderHeader();
      block.document.on('didAddPage', renderHeader);
    }
    if (this.getBody()) this.getBody().render(block);
    // TODO: table footer rendering
    if (renderHeader) {
      block.document.off('didAddPage', renderHeader);
    }
  };
});

module.exports = Table;
