"use strict";

var _ = require('lodash');
var Box = require('./box');

/**
 * Class DocumentHeader, extend from {@link module:kinda-document.Box Box}.
 * 
 * @class DocumentHeader
 * @memberof module:kinda-document
 * @param {Object} options - Init options.
 * @param {Function} fn - Init function.
 * @example // how to create instance?
 * var instance = DocumentHeader.create({}, function() {});
 */
var DocumentHeader = Box.extend('DocumentHeader', function() {
  this.defaults = {
    marginBottom: 5,
    alignment: 'left'
  };

  var superRender = this.render;
  this.render = function(block) {
    block.addRow({ isFloating: true }, function(block) {
      superRender.call(this, block);
      block.y = block.document.top - (block.height + this.margins.bottom);
    }.bind(this));
  };
});

module.exports = DocumentHeader;
