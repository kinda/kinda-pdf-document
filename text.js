"use strict";

var _ = require('lodash');
var misc = require('./misc');
var Component = require('./component');

var Text = Component.extend('Text', function() {
  var superCreator = this.getCreator();
  this.setCreator(function(parent, value, options, fn) {
    superCreator.call(this, parent, options, fn);
    this.value = value;
  });

  this.render = function(block) {
    var height = this.computeHeight(block);
    if (height > block.height) block.height = height;
    block.draw(function(pdf) {
      var x = block.mmToPt(block.x + block.padding);
      var y = block.mmToPt(block.y + block.padding);
      pdf.font(this.fontTypeFace)
          // .fontSize(this.fontSize)
          // .fillColor(this.color)
          .text(this.value, x, y, {
            width: block.mmToPt(block.width - block.padding * 2),
            align: this.alignment
      });
    }.bind(this));
  };

  this.computeHeight = function(block) {
    var height = block.computeHeightOfString(this.value);
    height -= 1.5; // little adjustment
    height += block.padding * 2;
    return height;
  };
});

module.exports = Text;
