"use strict";

var _ = require('lodash');
var KindaObject = require('kinda-object');

var Block = KindaObject.extend('Block', function() {
  Object.defineProperty(this, 'x', {
    get: function() {
      return this.parentBlock.x;
    },
    set: function(x) {
      this.parentBlock.x = x;
    },
    configurable: true
  });

  Object.defineProperty(this, 'y', {
    get: function() {
      return this.parentBlock.y;
    },
    set: function(y) {
      this.parentBlock.y = y;
    },
    configurable: true
  });

  Object.defineProperty(this, 'width', {
    get: function() {
      return this.parentBlock.width;
    },
    set: function(width) {
      this.parentBlock.width = width;
    },
    configurable: true
  });

  Object.defineProperty(this, 'height', {
    get: function() {
      return this.parentBlock.height;
    },
    set: function(height) {
      this.parentBlock.height = height;
    },
    configurable: true
  });

  Object.defineProperty(this, 'margin', {
    get: function() {
      // console.log(this._margin);
      return this._margin;
    },
    set: function(margin) {
      if (!_.isArray(margin)) {
        margin = [margin];
      }
      if (!this._margin) {
        this._margin = {};
      }
      this._margin.top = margin[0];
      this._margin.right = margin[1] || this._margin.top;
      this._margin.bottom = margin[2] || this._margin.top;
      this._margin.left = margin[3] || this._margin.right;
    },
    configurable: true
  });

  Object.defineProperty(this, 'padding', {
    get: function() {
      // console.log(this._padding);
      return this._padding;
    },
    set: function(padding) {
      if (!_.isArray(padding)) {
        padding = [padding];
      }

      if (!this._padding) {
        this._padding = {};
      }
      this._padding.top = padding[0];
      this._padding.right = padding[1] || this._padding.top;
      this._padding.bottom = padding[2] || this._padding.top;
      this._padding.left = padding[3] || this._padding.right;
    },
    configurable: true
  });

  Object.defineProperty(this, 'pdf', {
    get: function() {
      return this.parentBlock.pdf;
    },
    set: function(pdf) {
      this.parentBlock.pdf = pdf;
    },
    configurable: true
  });

  Object.defineProperty(this, 'drawBuffer', {
    get: function() {
      return this.parentBlock.drawBuffer;
    },
    set: function(drawBuffer) {
      this.parentBlock.drawBuffer = drawBuffer;
    },
    configurable: true
  });

  Object.defineProperty(this, 'document', {
    get: function() {
      return this.parentBlock.document;
    },
    set: function(document) {
      this.parentBlock.document = document;
    },
    configurable: true
  });

  this.draw = function(fn) {
    this.drawBuffer.push(fn);
  };

  this.flush = function() {
    this.drawBuffer.forEach(function(fn) {
      fn.call(undefined, this.pdf);
    }.bind(this));
    this.drawBuffer.length = 0;
  };

  this.computeWidthOfString = function(str, options) {
    this.pdf.font(options.fontTypeFace)
                .fontSize(options.fontSize);

    var width = this.pdf.widthOfString(str, {
      width: this.mmToPt(this.width)
    });

    return this.ptToMm(width);
  };

  this.computeHeightOfString = function(str, options) {
    this.pdf.font(options.fontTypeFace)
                .fontSize(options.fontSize);

    var height = this.pdf.heightOfString(
      str, { width: this.mmToPt(this.width - (this.padding.left + this.padding.right)) }
    );
    return this.ptToMm(height);
  };

  this.mmToPt = function(mm) {
    return mm * 0.0393701 * 72;
  };

  this.ptToMm = function(pt) {
    return pt / (0.0393701 * 72);
  };
});

module.exports = Block;
