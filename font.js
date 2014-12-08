"use strict";

var _ = require('lodash');
var KindaObject = require('kinda-object');

var Font = KindaObject.extend('Font', function() {
  this.setCreator(function(name, style, path, postScriptName) {
    // ...
  });
});

module.exports = Font;
