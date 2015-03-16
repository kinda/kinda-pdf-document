"use strict";

var _ = require('lodash');
var KindaObject = require('kinda-object');

var Block = KindaObject.extend('Block', function() {
  Object.defineProperty(this, 'paddings', {
    get: function() {
      if (!this._paddings) this._paddings = {};
      return this._paddings;
    },
    set: function(paddings) {
      if (_.isNumber(paddings)) paddings = [paddings];
      if (_.isArray(paddings)) {
        var top = paddings[0];
        var right = paddings[1];
        var bottom = paddings[2];
        var left = paddings[3];
        if (right == null) right = top;
        if (bottom == null) bottom = top;
        if (left == null) left = right;
        paddings = { top: top, right: right, bottom: bottom, left: left};
      }
      this._paddings = paddings;
    }
  });

  Object.defineProperty(this, 'paddingLeft', {
    get: function() {
      return this.paddings.left;
    },
    set: function(paddingLeft) {
      this.paddings.left = paddingLeft;
    }
  });

  Object.defineProperty(this, 'paddingRight', {
    get: function() {
      return this.paddings.right;
    },
    set: function(paddingRight) {
      this.paddings.right = paddingRight;
    }
  });

  Object.defineProperty(this, 'paddingTop', {
    get: function() {
      return this.paddings.top;
    },
    set: function(paddingTop) {
      this.paddings.top = paddingTop;
    }
  });

  Object.defineProperty(this, 'paddingBottom', {
    get: function() {
      return this.paddings.bottom;
    },
    set: function(paddingBottom) {
      this.paddings.bottom = paddingBottom;
    }
  });

  var knownStyles = ['strong', 'small'];

  var parseText = function(text, isStyled) {
    // TODO: better implementation (should support nested tags)
    if (!isStyled) return [{ text: text }];
    var str, index1, index2, index3, style, closingTag;
    var segments = [];
    while (text.length) {
      index1 = text.indexOf('<');
      if (index1 === -1) {
        segments.push({ text: text });
        break;
      }
      index1++;
      index2 = text.indexOf('>', index1);
      if (index2 === -1) {
        str = text.substr(0, index1);
        text = text.substr(index1);
        segments.push({ text: str });
        continue;
      }
      style = text.slice(index1, index2);
      index2++;
      closingTag = '</' + style + '>';
      index3 = text.indexOf(closingTag, index2);
      if (!_.contains(knownStyles, style) || index3 === -1) {
        str = text.substr(0, index2);
        text = text.substr(index2);
        segments.push({ text: str });
        continue;
      }
      str = text.substr(0, index1 - 1);
      if (str) segments.push({ text: str });
      str = text.slice(index2, index3);
      text = text.substr(index3 + closingTag.length);
      segments.push({ text: str, style: style });
    }
    return segments;
  };

  var applyStyle = function(options, style) {
    options = _.cloneDeep(options);
    switch (style) {
      case 'strong':
        if (!_.contains(options.fontStyle, 'bold')) {
          options.fontStyle.push('bold');
        }
        break;
      case 'small':
        options.fontSize = options.fontSize * 0.66;
        break;
    }
    return options;
  };

  this.renderText = function(pdf, str, options) {
    var x = this.mmToPt(this.x + this.paddings.left);
    var y = this.mmToPt(this.y + this.paddings.top);
    var width = this.width - (this.paddings.left + this.paddings.right)
    this._renderText(pdf, str, x, y, width, options);
  };

  this._renderText = function(pdf, str, x, y, width, options) {
    var segments = parseText(str, options.isStyled);
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];

      var segmentOptions = applyStyle(options, segment.style);
      var font = this.document.getFont(
        segmentOptions.fontTypeFace, segmentOptions.fontStyle
      );
      pdf.font(font.name, font.postScriptName);
      pdf.fontSize(segmentOptions.fontSize);
      pdf.fillColor(segmentOptions.color);

      var ascender = pdf._font.ascender / 1000; // TODO: clean this ugly code
      var normalAscender = ascender * options.fontSize;
      var segmentAscender = ascender * segmentOptions.fontSize;
      var offsetY = (normalAscender - segmentAscender);

      var opts = {};
      if (i < segments.length - 1) opts.continued = true;
      if (i === 0) {
        opts.width = this.mmToPt(width);
        opts.align = segmentOptions.alignment;
        pdf.text(segment.text, x, y + offsetY, opts);
      } else {
        pdf.y = pdf.y + offsetY;
        pdf.text(segment.text, opts);
      }
      pdf.y = pdf.y - offsetY; // FIXME: not sure what's happend in case of line break
    }
  };

  this.computeWidthOfString = function(str, options) {
    var width = 0;
    var segments = parseText(str, options.isStyled);
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      var segmentOptions = applyStyle(options, segment.style);
      var font = this.document.getFont(
        segmentOptions.fontTypeFace, segmentOptions.fontStyle
      );
      this.document.pdf.font(font.name, font.postScriptName);
      this.document.pdf.fontSize(segmentOptions.fontSize);
      var w = this.document.pdf.widthOfString(segment.text);
      w = this.ptToMm(w);
      width += w;
    }
    width += this.paddings.left + this.paddings.right + 0.000001;
    return width;
  };

  this.computeHeightOfString = function(str, options) {
    var width = this.width - (this.paddings.left + this.paddings.right);
    this._renderText(this.document.draft, str, 0, 0, width, options);
    var height = this.document.draft.y;
    // remove last line gap
    height -= this.document.draft.currentLineHeight(true) - this.document.draft.currentLineHeight(false);
    height = this.ptToMm(height);
    height += this.paddings.top + this.paddings.bottom;
    return height;
  };

  this.mmToPt = function(mm) {
    var inch = mm / 25.4;
    var pt = inch * 72;
    return pt;
  };

  this.ptToMm = function(pt) {
    var inch = pt / 72;
    var mm = inch * 25.4;
    return mm;
  };
});

module.exports = Block;
