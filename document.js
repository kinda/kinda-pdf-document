"use strict";

var fs = require('fs');
var _ = require('lodash');
var PDFDocument = require('pdfkit');
var Block = require('./block');
var VerticalBlock = require('./vertical-block');

var Document = Block.extend('Document', function() {
  this.setCreator(function(options) {
    if (!options) options = {};
    _.defaults(options, { width: 210, height: 297, padding: 10 });
    this.pdf = new PDFDocument({
      size: [this.mmToPt(options.width), this.mmToPt(options.height)],
      margin: 0
    });
    this.left = options.padding;
    this.top = options.padding;
    this.width = options.width - options.padding * 2;
    this.height = options.height - options.padding * 2;
    this.padding = 0;
    this.drawBuffer = [];
    this.document = this;
    this.x = this.left;
    this.y = this.top;
  });

  Object.defineProperty(this, 'x', {
    get: function() {
      return this._x;
    },
    set: function(x) {
      this._x = x;
    }
  });

  Object.defineProperty(this, 'y', {
    get: function() {
      return this._y;
    },
    set: function(y) {
      this._y = y;
    }
  });

  Object.defineProperty(this, 'width', {
    get: function() {
      return this._width;
    },
    set: function(width) {
      this._width = width;
    }
  });

  Object.defineProperty(this, 'height', {
    get: function() {
      return this._height;
    },
    set: function(height) {
      this._height = height;
    }
  });

  Object.defineProperty(this, 'pdf', {
    get: function() {
      return this._pdf;
    },
    set: function(pdf) {
      this._pdf = pdf;
    }
  });

  Object.defineProperty(this, 'drawBuffer', {
    get: function() {
      return this._drawBuffer;
    },
    set: function(drawBuffer) {
      this._drawBuffer = drawBuffer;
    }
  });

  Object.defineProperty(this, 'document', {
    get: function() {
      return this._document;
    },
    set: function(document) {
      this._document = document;
    }
  });

  this.addRow = function(options, fn) {
    var block = VerticalBlock.create(this, options);
    fn(block);
    block.flush();
    if (!block.isFloating) {
      this.y += block.height;
    }
  };

  this.addPage = function() {
    this.pdf.addPage();
    this.y = this.top;
    this.emit('didAddPage');
  };
});

Document.generatePDFFile = function(path, options, fn) {
  var stream = fs.createWriteStream(path);
  var document = this.create(options);
  document.pdf.pipe(stream);
  fn(document);
  document.pdf.end();
};

module.exports = Document;
