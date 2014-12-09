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

      var font = block.document.getFont(this.fontTypeFace, this.fontStyle);
      pdf.font(font.name, font.postScriptName);
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
      fontStyle: this.fontStyle,
      fontSize: this.fontSize
    };
    return block.computeWidthOfString(str, options);;
  };

  this.computeHeight = function(block) {
    var str = this.parseVariables(this.value, block);
    var options = {
      fontTypeFace: this.fontTypeFace,
      fontStyle: this.fontStyle,
      fontSize: this.fontSize
    };
    return block.computeHeightOfString(str, options);
  };
});

module.exports.Text = Text;
