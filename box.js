"use strict";

var _ = require('lodash');
var Component = require('./component');
var misc = require('./misc');

var Box = Component.extend('Box', function() {
  this.render = function(context, width) {
    var maxHeight = 0;
    this.childComponents.forEach(function(component) {
      var height = component.computeHeight(context, width);
      if (height > maxHeight) maxHeight = height;
    }.bind(this));
    maxHeight = misc.ptToMm(maxHeight);

    var nextY = context.y + maxHeight;
    if (nextY > context.height) context.addPage();

    this.childComponents.forEach(function(component) {
      component.render(context, width);
    }.bind(this));

    context.y += maxHeight;
  };
});


module.exports = Box;
