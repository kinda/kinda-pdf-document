"use strict";

var _ = require('lodash');
var Component = require('./');

var Text = Component.extend('Text', function() {
  var superCreator = this.getCreator();
  this.setCreator(function(parent, value, options, fn) {
    if (value == null) throw new Error('undefined value');
    value = String(value);
    superCreator.call(this, parent, options, fn);
    this.value = value;
  });

  this.render = function(block) {
    var height = this.computeHeight(block);
    if (height > block.height) block.height = height;

    block.document.draw(function(pdf) {
      var x = block.mmToPt(block.x + block.paddings.left);
      var y = block.mmToPt(block.y + block.paddings.top);
      var width = block.width - (block.paddings.left + block.paddings.right)

      pdf.font(this.fontTypeFace);
      pdf.fontSize(this.fontSize);
      pdf.fillColor(this.color);

      var str = this.parseVariables(this.value, block);
      pdf.text(str, x, y, {
        width: block.mmToPt(width),
        align: this.alignment
      });
    }.bind(this));
  };

  this.parseVariables = function(str, block) {
    var variables = [
      {
        placeholder: '{{reportTitle}}',
        replacement: function() { return block.document.title; }
      },
      {
        placeholder: '{{pageNumber}}',
        replacement: function() { return block.document.pageNumber; }
      },
      {
        placeholder: '{{numberOfPages}}',
        replacement: function() { return block.document.numberOfPages; }
      }
    ];

    variables.forEach(function(variable) {
      str = str.replace(variable.placeholder, variable.replacement);
    });

    return str;
  };

  this.computeWidth = function(block) {
    var str = this.parseVariables(this.value, block);
    var options = {
      fontTypeFace: this.fontTypeFace,
      fontSize: this.fontSize
    };
    var width = block.document.computeWidthOfString(str, options);
    width += block.paddings.left + block.paddings.right;
    return width;
  };

  this.computeHeight = function(block) {
    var str = this.parseVariables(this.value, block);
    var options = {
      width: block.width,
      fontTypeFace: this.fontTypeFace,
      fontSize: this.fontSize
    };
    var height = block.document.computeHeightOfString(str, options);
    height += block.paddings.top + block.paddings.bottom;
    return height;
  };
});

module.exports.Text = Text;
