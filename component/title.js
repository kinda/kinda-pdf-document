"use strict";

var _ = require('lodash');
var Row = require('../block/row');
var Box = require('./box');

var Title = Box.extend('Title', function() {
  this.defaults = {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    fontStyle: ['bold']
  };

  var superRender = this.render;
  this.render = function(block) {
    block.y += this.margins.top;
    block.addRow({ isFloating: false }, function(block) {
      superRender.call(this, block);
    }.bind(this));
  };
});

module.exports = Title;
