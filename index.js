"use strict";

var _ = require('lodash');
var Component = require('./component');
var Context = require('./context');

var KindaReport = Component.extend('KindaReport', function() {
  this.defaults = {
    fontTypeFace: 'Helvetica',
    width: 210,
    height: 297,
    alignment: 'left'
  };

  Object.defineProperty(this, 'width', {
    get: function() {
      return this._width;
    },
    set: function(value) {
      this._width = value;
    }
  });

  Object.defineProperty(this, 'height', {
    get: function() {
      return this._height;
    },
    set: function(value) {
      this._height = value;
    }
  });

  this.renderToPDFFile = function *() {
    var context = Context.create({
      width: this.width,
      height: this.height
    });
    this.childComponents.forEach(function(component) {
      component.render(context, this.width);
    }.bind(this));
    context.end();
  };
});

module.exports = KindaReport;
