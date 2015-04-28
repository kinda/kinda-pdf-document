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

  Object.defineProperty(this, 'fontFace', {
    get: function() {
      if (!_.isUndefined(this._fontFace))
        return this._fontFace;
      else if (this.parentComponent)
        return this.parentComponent.fontFace;
    },
    set: function(value) {
      this._fontFace = value;
    }
  });

  Object.defineProperty(this, 'fontWeight', {
    get: function() {
      if (!_.isUndefined(this._fontWeight))
        return this._fontWeight;
      else if (this.parentComponent)
        return this.parentComponent.fontWeight;
    },
    set: function(value) {
      this._fontWeight = value;
    }
  });

  Object.defineProperty(this, 'fontStyle', {
    get: function() {
      if (!_.isUndefined(this._fontStyle))
        return this._fontStyle;
      else if (this.parentComponent)
        return this.parentComponent.fontStyle;
    },
    set: function(fontStyle) {
      if (_.isString(fontStyle)) {
        fontStyle = [fontStyle];
      }

      this._fontStyle = fontStyle;
    }
  });

  Object.defineProperty(this, 'fontColor', {
    get: function() {
      if (!_.isUndefined(this._fontColor))
        return this._fontColor;
      else if (this.parentComponent)
        return this.parentComponent.fontColor;
    },
    set: function(value) {
      this._fontColor = value;
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

  Object.defineProperty(this, 'isStyled', {
    get: function() {
      if (!_.isUndefined(this._isStyled)) {
        return this._isStyled;
      }
      else if (this.parentComponent) {
        return this.parentComponent.isStyled;
      }
    },
    set: function(value) {
      this._isStyled = value;
    }
  });

  Object.defineProperty(this, 'margins', {
    get: function() {
      if (!this._margins) this._margins = {};
      return this._margins;
    },
    set: function(margins) {
      if (_.isNumber(margins)) margins = [margins];
      if (_.isArray(margins)) {
        var top = margins[0];
        var right = margins[1];
        var bottom = margins[2];
        var left = margins[3];
        if (right == null) right = top;
        if (bottom == null) bottom = top;
        if (left == null) left = right;
        margins = { top: top, right: right, bottom: bottom, left: left};
      }
      this._margins = margins;
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

  Object.defineProperty(this, 'marginLeft', {
    get: function() {
      return this.margins.left;
    },
    set: function(marginLeft) {
      this.margins.left = marginLeft;
    }
  });

  Object.defineProperty(this, 'marginRight', {
    get: function() {
      return this.margins.right;
    },
    set: function(marginRight) {
      this.margins.right = marginRight;
    }
  });

  Object.defineProperty(this, 'marginBottom', {
    get: function() {
      return this.margins.bottom;
    },
    set: function(marginBottom) {
      this.margins.bottom = marginBottom;
    }
  });

  Object.defineProperty(this, 'paddings', {
    get: function() {
      if (!this._paddings) this._paddings = {};
      return this._paddings;
    },
    set: function(paddings) {
      if (_.isNumber(paddings)) paddings = [paddings];
      if (_.isArray(paddings)) {
        var top = paddings[0];
        var right = paddings[1];
        var bottom = paddings[2];
        var left = paddings[3];
        if (right == null) right = top;
        if (bottom == null) bottom = top;
        if (left == null) left = right;
        paddings = { top: top, right: right, bottom: bottom, left: left};
      }
      this._paddings = paddings;
    }
  });

  Object.defineProperty(this, 'paddingLeft', {
    get: function() {
      return this.paddings.left;
    },
    set: function(paddingLeft) {
      this.paddings.left = paddingLeft;
    }
  });

  Object.defineProperty(this, 'paddingRight', {
    get: function() {
      return this.paddings.right;
    },
    set: function(paddingRight) {
      this.paddings.right = paddingRight;
    }
  });

  Object.defineProperty(this, 'paddingTop', {
    get: function() {
      return this.paddings.top;
    },
    set: function(paddingTop) {
      this.paddings.top = paddingTop;
    }
  });

  Object.defineProperty(this, 'paddingBottom', {
    get: function() {
      return this.paddings.bottom;
    },
    set: function(paddingBottom) {
      this.paddings.bottom = paddingBottom;
    }
  });

  this.findComponent = function(name) {
    if (this.getClassName() === name)
      return this;
    else if (this.parentComponent)
      return this.parentComponent.findComponent(name);
    else
      throw new Error("component '" + name + "' not found");
  };
});


module.exports = Component;
