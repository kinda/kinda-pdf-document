"use strict";

var _ = require('lodash');
var Box = require('./box');

var Paragraph = Box.extend('Paragraph', function() {
  this.defaults = {
    marginTop: 5,
    // marginBottom: 5
  };

  var superRender = this.render;
  this.render = function(block) {
    if (block.y !== block.document.top) {
      // marginTop should be ignored when y is at the top of the page
      block.y += this.margins.top;
    }
    block.addRow({}, function(block) {
      superRender.call(this, block);
    }.bind(this));
    // block.y += this.margins.bottom;
  };
});

module.exports = Paragraph;
