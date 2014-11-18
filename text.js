"use strict";

var _ = require('lodash');
var Component = require('./component');
var misc = require('./misc');

var Text = Component.extend('Text', function() {
  var superCreator = this.getCreator();
  this.setCreator(function(value, options, fn) {
    superCreator.call(this, options, fn);
    this.value = value;
  });

  Object.defineProperty(this, 'value', {
    get: function() {
      return this._value;
    },
    set: function(value) {
      this._value = value;
    }
  });

  this.render = function(context, width) {
    var x = misc.mmToPt(context.x);
    var y = misc.mmToPt(context.y);
    context.pdfDocument.text(this.value, x, y, {
      width: misc.mmToPt(width),
      align: this.alignment
    });
  };

  this.computeHeight = function(context, width) {
    return context.pdfDocument.heightOfString(
      this.value, { width: width });
  };
});

module.exports = Text;
