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
      var str = this.parseVariables(this.value, block);
      var options = {
        fontTypeFace: this.fontTypeFace,
        fontStyle: this.fontStyle,
        fontSize: this.fontSize,
        color: this.color,
        alignment: this.alignment,
        isStyled: this.isStyled
      }
      block.renderText(pdf, str, options);
    }.bind(this));
  };

  this.parseVariables = function(str, block) {
    var variables = [
      {
        placeholder: '{{documentTitle}}',
        replacement: function() { return block.document.title; }
      },
      {
        placeholder: '{{documentAuthor}}',
        replacement: function() { return block.document.author; }
      },
      {
        placeholder: '{{documentSubject}}',
        replacement: function() { return block.document.subject; }
      },
      {
        placeholder: '{{documentKeywords}}',
        replacement: function() { return block.document.keywords; }
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
      fontSize: this.fontSize,
      isStyled: this.isStyled
    };
    return block.computeWidthOfString(str, options);;
  };

  this.computeHeight = function(block) {
    var str = this.parseVariables(this.value, block);
    var options = {
      fontTypeFace: this.fontTypeFace,
      fontStyle: this.fontStyle,
      fontSize: this.fontSize,
      isStyled: this.isStyled
    };
    return block.computeHeightOfString(str, options);
  };
});

module.exports.Text = Text;
