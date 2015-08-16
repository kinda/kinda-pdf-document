'use strict';

let _ = require('lodash');
let Component = require('./');
let DocumentHeader = require('./document-header');
let DocumentBody = require('./document-body');
let DocumentFooter = require('./document-footer');
let DocumentBlock = require('../block/document');
let Font = require('../misc/font');

let Document = Component.extend('Document', function() {
  this.defaults = {
    width: 210,
    height: 297,
    paddings: 10,
    fontTypeFace: 'Helvetica',
    fontStyle: [],
    fontSize: 10,
    color: 'black',
    lineGap: 0,
    isStyled: false
  };

  let superCreator = this.creator;
  this.creator = function(options, fn) {
    superCreator.call(this, undefined, options, fn);

    this.registeredFonts = [];

    this.registerFont(
      'Courier', [], undefined, 'Courier'
    );
    this.registerFont(
      'Courier', ['bold'], undefined, 'Courier-Bold'
    );
    this.registerFont(
      'Courier', ['italic'], undefined, 'Courier-Oblique'
    );
    this.registerFont(
      'Courier', ['bold', 'italic'], undefined, 'Courier-BoldOblique'
    );
    this.registerFont(
      'Helvetica', [], undefined, 'Helvetica'
    );
    this.registerFont(
      'Helvetica', ['bold'], undefined, 'Helvetica-Bold'
    );
    this.registerFont(
      'Helvetica', ['italic'], undefined, 'Helvetica-Oblique'
    );
    this.registerFont(
      'Helvetica', ['bold', 'italic'], undefined, 'Helvetica-BoldOblique'
    );
    this.registerFont(
      'Times', [], undefined, 'Times-Roman'
    );
    this.registerFont(
      'Times', ['bold'], undefined, 'Times-Bold'
    );
    this.registerFont(
      'Times', ['italic'], undefined, 'Times-Italic'
    );
    this.registerFont(
      'Times', ['bold', 'italic'], undefined, 'Times-BoldItalic'
    );
    this.registerFont(
      'Symbol', [], undefined, 'Symbol'
    );
    this.registerFont(
      'ZapfDingbats', [], undefined, 'ZapfDingbats'
    );
  };

  this.addHeader = function(options, fn) {
    if (this._header) {
      throw new Error('a document cannot have more than one header');
    }
    this._header = DocumentHeader.create(this, options, fn);
    return this._header;
  };

  this.getHeader = function() {
    return this._header;
  };

  this.addBody = function(options, fn) {
    if (this._body) {
      throw new Error('a document cannot have more than one body');
    }
    this._body = DocumentBody.create(this, options, fn);
    return this._body;
  };

  this.getBody = function() {
    return this._body;
  };

  this.addFooter = function(options, fn) {
    if (this._footer) {
      throw new Error('a document cannot have more than one footer');
    }
    this._footer = DocumentFooter.create(this, options, fn);
    return this._footer;
  };

  this.getFooter = function() {
    return this._footer;
  };

  this.registerFont = function(name, style, path, postScriptName) {
    if (path && _.endsWith(path, '.ttc') && !postScriptName) {
      throw new Error('PostScriptName is required for TrueType Collection (.ttc)');
    }
    let font = Font.create(name, style, path, postScriptName);
    this.registeredFonts.push(font);
  };

  this.generatePDFFile = async function(path) {
    let options = {
      width: this.width,
      height: this.height,
      paddings: this.paddings,
      title: this.title,
      author: this.author,
      subject: this.subject,
      keywords: this.keywords,
      orientation: this.orientation,
      registeredFonts: this.registeredFonts
    };

    await DocumentBlock.generatePDFFile(path, options, document => {
      if (this.getHeader()) {
        let headerHeight;
        document.addRow({ isFloating: true }, block => {
          headerHeight = this.getHeader().computeHeight(block);
        });
        headerHeight += this.getHeader().margins.bottom;
        document.top += headerHeight; // Adjust document top
        document.height -= headerHeight; // Adjust document height
        document.y = document.top;
      }

      if (this.getFooter()) {
        let footerHeight;
        document.addRow({ isFloating: true }, block => {
          footerHeight = this.getFooter().computeHeight(block);
        });
        footerHeight += this.getFooter().margins.top;
        document.height -= footerHeight; // Adjust document height
      }

      if (this.getBody()) {
        this.getBody().render(document);
      }

      let range = document.pdf.bufferedPageRange();
      for (let i = range.start; i < range.count; i += 1) {
        document.pageNumber = i + 1;
        document.pdf.switchToPage(i);
        if (this.getHeader()) {
          this.getHeader().render(document);
        }
        if (this.getFooter()) {
          this.getFooter().render(document);
        }
      }
    });
  };
});

module.exports = Document;
