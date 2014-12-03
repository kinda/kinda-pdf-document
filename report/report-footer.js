"use strict";

var _ = require('lodash');
var Box = require('../box');

var ReportFooter = Box.extend('ReportFooter', function() {
  this.defaults = {
    marginTop: 5
  };

  var superRender = this.render;
  this.render = function(block) {
    block.addRow({ isFloating: true }, function(block) {
      block.y = block.document.top + block.document.height + this.margins.top;
      superRender.call(this, block);
    }.bind(this));
  };
});

module.exports = ReportFooter;
