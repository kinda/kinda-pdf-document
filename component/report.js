"use strict";

var _ = require('lodash');
var Component = require('./');
var ReportHeader = require('./report-header');
var ReportBody = require('./report-body');
var ReportFooter = require('./report-footer');
var Document = require('../block/document');

var KindaReport = Component.extend('KindaReport', function() {
  var superCreator = this.getCreator();
  this.setCreator(function(options, fn) {
    superCreator.call(this, undefined, options, fn);

    this.registeredFonts = [];

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

    // Same for other standard fonts (Times, Courier, Symbol,...)
  });

  this.defaults = {
    width: 210,
    height: 297,
    paddings: 10,
    fontTypeFace: 'Helvetica',
    fontSize: 10,
    color: 'black'
  };

  this.addHeader = function(options, fn) {
    if (this._header) {
      throw new Error('a report cannot have more than one header');
    }
    this._header = ReportHeader.create(this, options, fn);
    return this._header;
  };

  this.getHeader = function() {
    return this._header;
  };

  this.addBody = function(options, fn) {
    if (this._body) {
      throw new Error('a report cannot have more than one body');
    }
    this._body = ReportBody.create(this, options, fn);
    return this._body;
  };

  this.getBody = function() {
    return this._body;
  };

  this.addFooter = function(options, fn) {
    if (this._footer) {
      throw new Error('a report cannot have more than one footer');
    }
    this._footer = ReportFooter.create(this, options, fn);
    return this._footer;
  };

  this.getFooter = function() {
    return this._footer;
  };

  this.registerFont = function(name, style, path, postScriptName) {
    // ...
  };

  this.generatePDFFile = function *(path) {
    var options = {
      width: this.width,
      height: this.height,
      paddings: this.paddings.top,
      title: this.title,
      author: this.author,
      subject: this.subject,
      keywords: this.keywords,
      orientation: this.orientation,
      registeredFonts: this.registeredFonts
    };
    yield Document.generatePDFFile(path, options, function(document) {
      if (this.getHeader()) {
        var headerHeight;
        document.addRow({ isFloating: true }, function(block) {
          headerHeight = this.getHeader().computeHeight(block);
        }.bind(this));
        headerHeight += this.getHeader().margins.bottom;
        document.top += headerHeight; // Adjust document top
        document.height -= headerHeight; // Adjust document height
        document.y = document.top;
      }

      if (this.getFooter()) {
        var footerHeight;
        document.addRow({ isFloating: true }, function(block) {
          footerHeight = this.getFooter().computeHeight(block);
        }.bind(this));
        footerHeight += this.getFooter().margins.top;
        document.height -= footerHeight; // Adjust document height
      }

      if (this.getBody()) {
        this.getBody().render(document);
      }

      var range = document.pdf.bufferedPageRange();
      for (var i = range.start; i < range.count; i += 1) {
        document.pageNumber = i + 1;
        document.pdf.switchToPage(i);
        if (this.getHeader()) {
          this.getHeader().render(document);
        }
        if (this.getFooter()) {
          this.getFooter().render(document);
        }
      }
    }.bind(this));
  };
});

module.exports = KindaReport;
