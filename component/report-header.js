"use strict";

var _ = require('lodash');
var Box = require('./box');

var ReportHeader = Box.extend('ReportHeader', function() {
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

module.exports = ReportHeader;
