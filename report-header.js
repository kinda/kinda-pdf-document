"use strict";

var _ = require('lodash');
var Box = require('./box');

var ReportHeader = Box.extend('ReportHeader', function() {
  this.defaults = {
    marginBottom: 5
  };

  var superRender = this.render;
  this.render = function(block) {
    block.addRow(undefined, function(block) {
      superRender.call(this, block);
      if (block.height) block.height += this.marginBottom;
    }.bind(this));
  };
});

module.exports = ReportHeader;
