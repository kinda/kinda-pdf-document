"use strict";

var _ = require('lodash');
var Component = require('./component');

var KindaReport = Component.extend('KindaReport', function() {
  this.setCreator(function(options, fn)) {
    if (_.isFunction(options)) {
      fn = options;
      options = undefined;
    }
    if (!options) options = {};

    if (fn) fn(this);
  };
});

module.exports = KindaReport;
