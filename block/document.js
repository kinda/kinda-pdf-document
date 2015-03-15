"use strict";

var fs = require('fs');
var _ = require('lodash');
var PDFDocument = require('pdfkit');
var Block = require('./');
var Row = require('./row');

var Document = Block.extend('Document', function() {
  this.setCreator(function(options) {
    if (!options) options = {};
    _.defaults(options, {
      width: 210,
      height: 297,
      paddings: 10,
      orientation: 'portrait'
    });

    this.document = this;

    this.paddings = options.paddings;
    this.left = this.paddings.left;
    this.top = this.paddings.top;

    if (options.orientation === 'portrait') {
      this.width = options.width;
      this.height = options.height;
    } else if (options.orientation === 'landscape') {
      this.width = options.height;
      this.height = options.width;
    } else {
      throw new Error('invalid orientation');
    }

    this.width -= this.paddings.left + this.paddings.right;
    this.height -= this.paddings.top + this.paddings.bottom;

    this.author = options.author;
    this.title = options.title;
    this.keywords = options.keywords;
    this.subject = options.subject;
    this.orientation = options.orientation;

    this.registeredFonts = options.registeredFonts;

    this.pageNumber = 1;
    this.numberOfPages = 1;

    this.x = this.left;
    this.y = this.top;

    var info = {};
    if (this.title) info.Title = this.title;
    if (this.author) info.Author = this.author;
    if (this.subject) info.Subject = this.subject;
    if (this.keywords) info.Keywords = this.keywords;

    this.pdf = new PDFDocument({
      size: [this.mmToPt(options.width), this.mmToPt(options.height)],
      margin: 0,
      bufferPages: true,
      layout: this.orientation,
      info: info
    });

    this.draft = new PDFDocument({
      // used by computeWidthOfString and computeHeightOfString
      size: [this.mmToPt(options.width), this.mmToPt(options.height)],
      margin: 0,
      layout: this.orientation,
    });
  });

  this.addPage = function() {
    this.pdf.addPage();
    this.y = this.top;
    this.numberOfPages++;
    this.emit('didAddPage');
  };

  this.addRow = function(options, fn) {
    var block = Row.create(this, options);
    fn(block);
    this.flush();
    if (!block.isFloating) {
      this.y += block.height;
    }
  };

  Object.defineProperty(this, 'drawBuffer', {
    get: function() {
      if (!this._drawBuffer) this._drawBuffer = [];
      return this._drawBuffer;
    }
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

  this.getFont = function(typeFace, style) {
    if (!style) style = [];

    var candidateFonts = this.registeredFonts;

    candidateFonts = _.filter(candidateFonts, function(candidateFont) {
      return candidateFont.name === typeFace;
    });

    // Optimization
    candidateFonts = _.filter(candidateFonts, function(candidateFont) {
      return candidateFont.style.length === style.length;
    });

    candidateFonts = _.filter(candidateFonts, function(candidateFont) {
      return _.every(style, function(stl) {
        return _.contains(candidateFont.style, stl);
      });
    });

    if (!candidateFonts.length) {
      throw new Error('font not found (unknown combination of typeFace and style)');
    }

    if (!candidateFonts.length > 1) {
      throw new Error('duplicate fonts found');
    }

    var candidate = candidateFonts[0];
    if (candidate.path) {
      return {
        name: candidate.path,
        postScriptName: candidate.postScriptName
      };
    } else {
      return {
        name: candidate.postScriptName
      }
    }
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
