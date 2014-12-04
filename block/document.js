"use strict";

var fs = require('fs');
var _ = require('lodash');
var PDFDocument = require('pdfkit');
var Block = require('./');
var VerticalBlock = require('./vertical-block');

var Document = Block.extend('Document', function() {
  this.setCreator(function(options) {
    if (!options) options = {};
    _.defaults(options, { width: 210, height: 297, paddings: 10 });

    this.paddings = options.paddings;
    this.left = this.paddings.left;
    this.top = this.paddings.top;

    if (options.orientation === 'landscape') {
      this.width = options.height - (this.paddings.left + this.paddings.right) ;
      this.height = options.width - (this.paddings.top + this.paddings.bottom);
    } else {
      options.orientation = 'portrait';
      this.width = options.width - (this.paddings.left + this.paddings.right) ;
      this.height = options.height - (this.paddings.top + this.paddings.bottom);
    }

    this.drawBuffer = [];
    this.document = this;
    this.x = this.left;
    this.y = this.top;
    this.headerHeight = 0;
    this.currentPage = 1;
    this.totalPages = 1;
    this.info = options.info;

    this.pdf = new PDFDocument({
      size: [this.mmToPt(options.width), this.mmToPt(options.height)],
      margin: 0,
      bufferPages: true,
      info: options.info,
      layout: options.orientation
    });
  });

  Object.defineProperty(this, 'textVariables', {
    get: function() {
      this._textVariables = [
      {
        placeholder: '{{currentPage}}',
        replacement: this.currentPage
      },
      {
        placeholder: '{{totalPages}}',
        replacement: this.totalPages
      },
      {
        placeholder: '{{reportTitle}}',
        replacement: this.info.Title
      }
      ];

      return this._textVariables;
    }
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
    this.y = this.top + this.headerHeight;
    this.emit('didAddPage');
  };
});

Document.generatePDFFile = function *(path, options, fn) {
  var stream = fs.createWriteStream(path);
  var document = this.create(options);
  document.pdf.pipe(stream);
  fn(document);
  document.pdf.end();
  yield function(cb) {
    stream.on('finish', cb);
  };
};

module.exports = Document;
