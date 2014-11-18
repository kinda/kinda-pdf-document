"use strict";

var _ = require('lodash');
var Box = require('./box');

var ReportHeader = Box.extend('ReportHeader', function() {
  var superRender = this.render;
  this.render = function(context, width) {
    var fn = superRender.bind(this, context, width);
    fn.call();
    context.headerFunctions.push(fn);
  };
});


module.exports = ReportHeader;
