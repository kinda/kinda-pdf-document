"use strict";

var _ = require('lodash');
var Box = require('../box');

var ReportHeader = Box.extend('ReportHeader', function() {
  this.defaults = {
    margins: [0, 0, 5, 0]
  };

  var superRender = this.render;
  this.render = function(block) {
    block.addRow({ isFloating: true }, function(block) {
      block.y = block.document.top;
      superRender.call(this, block);
      if (block.height) block.height += this.margins.bottom;
    }.bind(this));
  };
});

module.exports = ReportHeader;
