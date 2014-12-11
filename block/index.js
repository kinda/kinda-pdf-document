"use strict";

var _ = require('lodash');
var KindaObject = require('kinda-object');

/**
 * Class Block, extend from KindaObject.
 * @class Block
 * @memberof module:kinda-document
 * @private
 * @param {Object} options - Init options.
 * @param {Function} fn - Init function.
 * @example // how to create instance?
 * // var  instance = Block.create({}, function() {});
 */
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

  this.computeWidthOfString = function(str, options) {
    var font = this.document.getFont(options.fontTypeFace, options.fontStyle);
    this.document.pdf.font(font.name, font.postScriptName);
    this.document.pdf.fontSize(options.fontSize);

    var width = this.document.pdf.widthOfString(str);
    width = this.ptToMm(width);
    width += this.paddings.left + this.paddings.right + 0.000001;
    return width;
  };

  this.computeHeightOfString = function(str, options) {
    var font = this.document.getFont(options.fontTypeFace, options.fontStyle);
    this.document.pdf.font(font.name, font.postScriptName);
    this.document.pdf.fontSize(options.fontSize);
    var width = this.width - (this.paddings.left + this.paddings.right);
    var height = this.document.pdf.heightOfString(
      str,
      { width: this.mmToPt(width) }
    );
    // remove last line gap
    height -= this.document.pdf.currentLineHeight(true) - this.document.pdf.currentLineHeight(false);
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
