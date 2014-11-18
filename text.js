"use strict";

var _ = require('lodash');
var KindaObject = require('kinda-object');

var Text = KindaObject.extend('Text', function() {

});

Object.defineProperty(Text, 'value', {
  get: function() {
    return Text._value;
  },
  set: function(newValue) {
    Text._value = newValue;
  },
  enumerable: true,
  configurable: true
});

module.exports = Text;
