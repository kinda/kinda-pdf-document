"use strict";

var _ = require('lodash');
var Component = require('./component');
var ReportHeader = require('./report-header');
var ReportBody = require('./report-body');
var ReportFooter = require('./report-footer');
var Document = require('./document');

var KindaReport = Component.extend('KindaReport', function() {
  var superCreator = this.getCreator();
  this.setCreator(function(options, fn) {
    superCreator.call(this, undefined, options, fn);
  });

  this.defaults = {
    fontTypeFace: 'Helvetica',
    // fontSize: 14,
    color: 'black',
    width: 210,
    height: 297,
    padding: 10,
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
    Document.generatePDFFile(
      path,
      { width: this.width, height: this.height, padding: this.padding },
      function(document) {
        var renderHeader;
        if (this.getHeader()) {
          renderHeader = function() {
            this.getHeader().render(document);
          }.bind(this);
          renderHeader();
          document.on('didAddPage', renderHeader);
        }

        var renderFooter;
        if (this.getFooter()) {
          var footerHeight = this.getFooter().computeHeight(document);
          footerHeight += this.getFooter().marginTop;
          document.height -= footerHeight; // Adjust document height
          renderFooter = function() {
            this.getFooter().render(document);
          }.bind(this);
          renderFooter();
          document.on('didAddPage', renderFooter);
        }

        if (this.getBody()) {
          this.getBody().render(document);
        }

        if (renderHeader) {
          document.off('didAddPage', renderHeader);
        }

        if (renderFooter) {
          document.off('didAddPage', renderFooter);
        }
      }.bind(this)
    );
  };
});

module.exports = KindaReport;
