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
