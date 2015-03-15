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

    // block.document.draw(function(pdf) {
    //   var x = block.mmToPt(block.x + block.paddings.left);
    //   var y = block.mmToPt(block.y + block.paddings.top);
    //   var width = block.width - (block.paddings.left + block.paddings.right)
    //
    //   var str = this.parseVariables(this.value, block);
    //   var segments = parseStyledText(str);
    //   for (var i = 0; i < segments.length; i++) {
    //     var segment = segments[i];
    //
    //     var fontTypeFace = this.fontTypeFace;
    //     var fontStyle = _.clone(this.fontStyle);
    //     var fontSize = this.fontSize;
    //     var color = this.color;
    //     var offsetY = 0;
    //     switch (segment.style) {
    //       case 'strong':
    //         if (!_.contains(fontStyle, 'bold')) fontStyle.push('bold');
    //         break;
    //       case 'small':
    //         // TODO: clean this ugly code
    //         var font = block.document.getFont(fontTypeFace, fontStyle);
    //         pdf.font(font.name, font.postScriptName);
    //         var ascender = pdf._font.ascender / 1000;
    //         var normalAscender = ascender * fontSize;
    //         fontSize = fontSize * 0.66;
    //         var smallAscender = ascender * fontSize;
    //         offsetY = (normalAscender - smallAscender);
    //         break;
    //     }
    //     var font = block.document.getFont(fontTypeFace, fontStyle);
    //     pdf.font(font.name, font.postScriptName);
    //     pdf.fontSize(fontSize);
    //     pdf.fillColor(color);
    //
    //     var options = {};
    //     if (i < segments.length - 1) options.continued = true;
    //     if (i === 0) {
    //       options.width = block.mmToPt(width);
    //       options.align = this.alignment;
    //       pdf.text(segment.text, x, y + offsetY, options);
    //     } else {
    //       pdf.y = pdf.y + offsetY;
    //       pdf.text(segment.text, options);
    //     }
    //     pdf.y = pdf.y - offsetY; // FIXME: not sure what's happend in case of line break
    //   }
    // }.bind(this));
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
