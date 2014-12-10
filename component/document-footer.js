"use strict";

var _ = require('lodash');
var Box = require('./box');

/**
 * Class DocumentFooter, extend from {@link module:kinda-document.Box Box}.
 * 
 * @class DocumentFooter
 * @memberof module:kinda-document
 * @param {Object} options - Init options.
 * @param {Function} fn - Init function.
 * @example // how to create instance?
 * var instance = DocumentFooter.create({}, function() {});
 */
var DocumentFooter = Box.extend('DocumentFooter', function() {
  this.defaults = {
    marginTop: 5,
    alignment: 'left'
  };

  var superRender = this.render;
  this.render = function(block) {
    block.addRow({ isFloating: true }, function(block) {
      block.y = block.document.top + block.document.height + this.margins.top;
      superRender.call(this, block);
    }.bind(this));
  };
});

module.exports = DocumentFooter;
