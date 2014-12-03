"use strict";

var _ = require('lodash');
var Box = require('./box');

var ReportHeader = Box.extend('ReportHeader', function() {
  this.defaults = {
    margin: [5, 0, 0, 0]
  };

  var superRender = this.render;
  this.render = function(block) {
    block.addRow(undefined, function(block) {
      superRender.call(this, block);
      if (block.height) block.height += this.margin.bottom;
    }.bind(this));
  };
});

module.exports = ReportHeader;
