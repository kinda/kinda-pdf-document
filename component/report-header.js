"use strict";

var _ = require('lodash');
var Box = require('./box');

var ReportHeader = Box.extend('ReportHeader', function() {
  this.defaults = {
    margins: [0, 0, 5, 0]
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
