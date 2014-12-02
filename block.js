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
      str, { width: this.mmToPt(this.width) }
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
