"use strict";

var _ = require('lodash');
var Component = require('../component');

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
      var x = block.mmToPt(block.x + block.paddings.left);
      var y = block.mmToPt(block.y + block.paddings.top);
      var width = block.width; // - (block.paddings.left + block.paddings.right)

      pdf.font(this.fontTypeFace);
      pdf.fontSize(this.fontSize);
      pdf.fillColor(this.color);

      var text = this.value + '';
      block.document.textVariables.forEach(function(textVariable) {
        text = text.replace(textVariable.placeholder, textVariable.replacement);
      });

      pdf.text(text, x, y, {
        width: block.mmToPt(width),
        align: this.alignment
      });
    }.bind(this));
  };

  this.computeWidth = function(block) {
    var options = {
      fontTypeFace: this.fontTypeFace,
      fontSize: this.fontSize
    };
    var width = block.computeWidthOfString(this.value, options);
    width += block.paddings.left + block.paddings.right;
    return width;
  };

  this.computeHeight = function(block) {
    var options = {
      fontTypeFace: this.fontTypeFace,
      fontSize: this.fontSize
    };
    var height = block.computeHeightOfString(this.value, options);
    height += block.paddings.top + block.paddings.bottom;
    return height;
  };
});

module.exports.Text = Text;
