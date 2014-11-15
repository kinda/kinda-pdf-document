"use strict";

var _ = require('lodash');
var KindaObject = require('kinda-object');

var KindaReport = KindaObject.extend('KindaReport', function() {
  this.setCreator(function(options, fn)) {
    if (_.isFunction(options)) {
      fn = options;
      options = undefined;
    }
    if (!options) options = {};
    // ...
  };
});

module.exports = KindaReport;
