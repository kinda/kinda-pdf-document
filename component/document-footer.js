"use strict";

var _ = require('lodash');
var Box = require('./box');

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
