"use strict";

var _ = require('lodash');
var Component = require('../component');
var ReportHeader = require('./report-header');
var ReportBody = require('./report-body');
var ReportFooter = require('./report-footer');
var Document = require('../block/document');

var KindaReport = Component.extend('KindaReport', function() {
  var superCreator = this.getCreator();
  this.setCreator(function(options, fn) {
    superCreator.call(this, undefined, options, fn);
  });

  this.defaults = {
    fontTypeFace: 'Helvetica',
    fontSize: 14,
    color: 'black',
    width: 210,
    height: 297,
    paddings: 10,
    alignment: 'left'
  };

  this.addHeader = function(options, fn) {
    if (this._header) {
      throw new Error('a report cannot have more than one header');
    }
    this._header = ReportHeader.create(this, options, fn);
  };

  this.getHeader = function() {
    return this._header;
  };

  this.addBody = function(options, fn) {
    if (this._body) {
      throw new Error('a report cannot have more than one body');
    }
    this._body = ReportBody.create(this, options, fn);
  };

  this.getBody = function() {
    return this._body;
  };

  this.addFooter = function(options, fn) {
    if (this._footer) {
      throw new Error('a report cannot have more than one footer');
    }
    this._footer = ReportFooter.create(this, options, fn);
  };

  this.getFooter = function() {
    return this._footer;
  };

  this.generatePDFFile = function *(path) {
    yield Document.generatePDFFile(
      path,
      { width: this.width,
        height: this.height,
        paddings: this.paddings.top,
        title: this.title },
      function(document) {
        if (this.getHeader()) {
          var headerHeight;
          document.addRow({ isFloating: true }, function(block) {
            headerHeight = this.getHeader().computeHeight(block);
          }.bind(this));
          headerHeight += this.getHeader().margins.bottom;
          document.headerHeight = headerHeight;
          document.y += headerHeight;
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

        var bufferedPageRange = document.pdf.bufferedPageRange();
        document.totalPages = bufferedPageRange.count;
        for (var i=bufferedPageRange.start; i<bufferedPageRange.count; i+=1) {
          document.currentPage = i + 1;
          document.pdf.switchToPage(i);
          this.getHeader().render(document);
          this.getFooter().render(document);
        }
      }.bind(this)
    );
  };
});

module.exports = KindaReport;
