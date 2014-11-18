"use strict";

var _ = require('lodash');
var KindaObject = require('kinda-object');

var Component = KindaObject.extend('Component', function() {
  this.setCreator(function(options, fn) {
    if (_.isFunction(options)) {
      fn = options;
      options = undefined;
    }
    if (!options) options = {};
    _.defaults(options, this.defaults);
    _.assign(this, options);
    if (fn) fn(this);
  });

  Object.defineProperty(this, 'parentComponent', {
    get: function() {
      return this._parentComponent;
    },
    set: function(component) {
      this._parentComponent = component;
    }
  });

  Object.defineProperty(this, 'childComponents', {
    get: function() {
      if(!this._childComponents) this._childComponents = [];
      return this._childComponents;
    }
  });

  this.addChildComponent = function(component) {
    component.parentComponent = this;
    this.childComponents.push(component);
  };

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
});


module.exports = Component;
