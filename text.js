"use strict";

var _ = require('lodash');
var Component = require('./component');

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
});

module.exports = Text;
