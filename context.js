"use strict";

var fs = require('fs');
var _ = require('lodash');
var PDFDocument = require('pdfkit');
var KindaObject = require('kinda-object');
var misc = require('./misc');

var Context = KindaObject.extend('Context', function() {
  this.setCreator(function(options) {
    _.assign(this, options);
    var size = [
      misc.mmToPt(this.width),
      misc.mmToPt(this.height)
    ];
    this.pdfDocument = new PDFDocument({
      size: size,
      margin: 0
    });
    var stream = fs.createWriteStream('test.pdf');
    this.pdfDocument.pipe(stream);
    this.x = 0;
    this.y = 0;
  });

  this.addPage = function() {
    this.pdfDocument.addPage();
    this.x = 0;
    this.y = 0;
  };

  this.end = function() {
    this.pdfDocument.end();
  };
});

module.exports = Context;
