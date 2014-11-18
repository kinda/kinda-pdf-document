"use strict";

var _ = require('lodash');
var Component = require('./component');

var KindaReport = Component.extend('KindaReport', function() {
  this.defaults = {
    fontTypeFace: 'Helvetica'
  };

  this.renderToPDFFile = function *() {
    // ...
  };
});

module.exports = KindaReport;
