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

  Object.defineProperty(this, 'margin', {
    get: function() {
      // console.log(this._margin);
      return this._margin;
    },
    set: function(margin) {
      if (!_.isArray(margin)) {
        margin = [margin];
      }
      if (!this._margin) {
        this._margin = {};
      }
      this._margin.top = margin[0];
      this._margin.right = margin[1] || this._margin.top;
      this._margin.bottom = margin[2] || this._margin.top;
      this._margin.left = margin[3] || this._margin.right;
    }
  });

  Object.defineProperty(this, 'padding', {
    get: function() {
      // console.log(this._padding);
      return this._padding;
    },
    set: function(padding) {
      if (!_.isArray(padding)) {
        padding = [padding];
      }

      if (!this._padding) {
        this._padding = {};
      }
      this._padding.top = padding[0];
      this._padding.right = padding[1] || this._padding.top;
      this._padding.bottom = padding[2] || this._padding.top;
      this._padding.left = padding[3] || this._padding.right;
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
