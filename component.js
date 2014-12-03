"use strict";

var _ = require('lodash');
var KindaObject = require('kinda-object');

var Component = KindaObject.extend('Component', function() {
  this.setCreator(function(parent, options, fn) {
    if (_.isFunction(options)) {
      fn = options;
      options = undefined;
    }
    if (!options) options = {};
    if (parent) this.parentComponent = parent;
    _.defaults(options, this.defaults);
    _.assign(this, options);
    if (fn) fn(this);
  });

  Object.defineProperty(this, 'fontTypeFace', {
    get: function() {
      if (!_.isUndefined(this._fontTypeFace))
        return this._fontTypeFace;
      else if (this.parentComponent)
        return this.parentComponent.fontTypeFace;
    },
    set: function(value) {
      this._fontTypeFace = value;
    }
  });

  Object.defineProperty(this, 'fontSize', {
    get: function() {
      if (!_.isUndefined(this._fontSize)) {
        return this._fontSize;
      }
      else if (this.parentComponent) {
        return this.parentComponent.fontSize;
      }
    },
    set: function(value) {
      this._fontSize = value;
    }
  });

  Object.defineProperty(this, 'color', {
    get: function() {
      if (!_.isUndefined(this._color)) {
        return this._color;
      }
      else if (this.parentComponent) {
        return this.parentComponent.color;
      }
    },
    set: function(value) {
      this._color = value;
    }
  });

  Object.defineProperty(this, 'alignment', {
    get: function() {
      if (!_.isUndefined(this._alignment))
        return this._alignment;
      else if (this.parentComponent)
        return this.parentComponent.alignment;
    },
    set: function(value) {
      this._alignment = value;
    }
  });

  Object.defineProperty(this, 'margins', {
    get: function() {
      if (!this._margins) this._margins = {};
      return this._margins;
    },
    set: function(margins) {
      if (!_.isArray(margins)) margins = [margins];

      var top = margins[0];
      var right = margins[1];
      var bottom = margins[2];
      var left = margins[3];

      if (right == null) right = top;
      if (bottom == null) bottom = top;
      if (left == null) left = right;

      this.margins.top = top;
      this.margins.right = right;
      this.margins.bottom = bottom;
      this.margins.left = left;
    }
  });

  Object.defineProperty(this, 'marginTop', {
    get: function() {
      return this.margins.top;
    },
    set: function(marginTop) {
      this.margins.top = marginTop;
    }
  });

  Object.defineProperty(this, 'paddings', {
    get: function() {
      if (!this._paddings) this._paddings = {};
      return this._paddings;
    },
    set: function(paddings) {
      if (!_.isArray(paddings)) paddings = [paddings];

      var top = paddings[0];
      var right = paddings[1];
      var bottom = paddings[2];
      var left = paddings[3];

      if (right == null) right = top;
      if (bottom == null) bottom = top;
      if (left == null) left = right;

      this.paddings.top = top;
      this.paddings.right = right;
      this.paddings.bottom = bottom;
      this.paddings.left = left;
    }
  });

  this.findComponent = function(name) {
    if (this.getClass().name === name)
      return this;
    else if (this.parentComponent)
      return this.parentComponent.findComponent(name);
    else
      throw new Error("component '" + name + "' not found");
  };
});


module.exports = Component;
