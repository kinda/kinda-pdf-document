'use strict';

let _ = require('lodash');
let KindaObject = require('kinda-object');

let Component = KindaObject.extend('Component', function() {
  this.creator = function(parent, options, fn) {
    if (_.isFunction(options)) {
      fn = options;
      options = undefined;
    }
    if (!options) options = {};
    if (parent) this.parentComponent = parent;
    _.defaults(options, this.defaults);
    _.assign(this, options);
    if (fn) fn(this);
  };

  Object.defineProperty(this, 'fontTypeFace', {
    get() {
      if (!_.isUndefined(this._fontTypeFace)) return this._fontTypeFace;
      else if (this.parentComponent) return this.parentComponent.fontTypeFace;
    },
    set(value) {
      this._fontTypeFace = value;
    }
  });

  Object.defineProperty(this, 'fontFace', {
    get() {
      if (!_.isUndefined(this._fontFace)) return this._fontFace;
      else if (this.parentComponent) return this.parentComponent.fontFace;
    },
    set(value) {
      this._fontFace = value;
    }
  });

  Object.defineProperty(this, 'fontWeight', {
    get() {
      if (!_.isUndefined(this._fontWeight)) return this._fontWeight;
      else if (this.parentComponent) return this.parentComponent.fontWeight;
    },
    set(value) {
      this._fontWeight = value;
    }
  });

  Object.defineProperty(this, 'fontStyle', {
    get() {
      if (!_.isUndefined(this._fontStyle)) return this._fontStyle;
      else if (this.parentComponent) return this.parentComponent.fontStyle;
    },
    set(fontStyle) {
      if (_.isString(fontStyle)) fontStyle = [fontStyle];
      this._fontStyle = fontStyle;
    }
  });

  Object.defineProperty(this, 'fontColor', {
    get() {
      if (!_.isUndefined(this._fontColor)) return this._fontColor;
      else if (this.parentComponent) return this.parentComponent.fontColor;
    },
    set(value) {
      this._fontColor = value;
    }
  });

  Object.defineProperty(this, 'fontSize', {
    get() {
      if (!_.isUndefined(this._fontSize)) return this._fontSize;
      else if (this.parentComponent) return this.parentComponent.fontSize;
    },
    set(value) {
      this._fontSize = value;
    }
  });

  Object.defineProperty(this, 'color', {
    get() {
      if (!_.isUndefined(this._color)) return this._color;
      else if (this.parentComponent) return this.parentComponent.color;
    },
    set(value) {
      this._color = value;
    }
  });

  Object.defineProperty(this, 'alignment', {
    get() {
      if (!_.isUndefined(this._alignment)) return this._alignment;
      else if (this.parentComponent) return this.parentComponent.alignment;
    },
    set(value) {
      this._alignment = value;
    }
  });

  Object.defineProperty(this, 'lineGap', {
    get() {
      if (!_.isUndefined(this._lineGap)) return this._lineGap;
      else if (this.parentComponent) return this.parentComponent.lineGap;
    },
    set(value) {
      this._lineGap = value;
    }
  });

  Object.defineProperty(this, 'isStyled', {
    get() {
      if (!_.isUndefined(this._isStyled)) return this._isStyled;
      else if (this.parentComponent) return this.parentComponent.isStyled;
    },
    set(value) {
      this._isStyled = value;
    }
  });

  Object.defineProperty(this, 'margins', {
    get() {
      if (!this._margins) this._margins = {};
      return this._margins;
    },
    set(margins) {
      if (_.isNumber(margins)) margins = [margins];
      if (_.isArray(margins)) {
        let top = margins[0];
        let right = margins[1];
        let bottom = margins[2];
        let left = margins[3];
        if (right == null) right = top;
        if (bottom == null) bottom = top;
        if (left == null) left = right;
        margins = { top, right, bottom, left };
      }
      this._margins = margins;
    }
  });

  Object.defineProperty(this, 'marginTop', {
    get() {
      return this.margins.top;
    },
    set(marginTop) {
      this.margins.top = marginTop;
    }
  });

  Object.defineProperty(this, 'marginLeft', {
    get() {
      return this.margins.left;
    },
    set(marginLeft) {
      this.margins.left = marginLeft;
    }
  });

  Object.defineProperty(this, 'marginRight', {
    get() {
      return this.margins.right;
    },
    set(marginRight) {
      this.margins.right = marginRight;
    }
  });

  Object.defineProperty(this, 'marginBottom', {
    get() {
      return this.margins.bottom;
    },
    set(marginBottom) {
      this.margins.bottom = marginBottom;
    }
  });

  Object.defineProperty(this, 'paddings', {
    get() {
      if (!this._paddings) this._paddings = {};
      return this._paddings;
    },
    set(paddings) {
      if (_.isNumber(paddings)) paddings = [paddings];
      if (_.isArray(paddings)) {
        let top = paddings[0];
        let right = paddings[1];
        let bottom = paddings[2];
        let left = paddings[3];
        if (right == null) right = top;
        if (bottom == null) bottom = top;
        if (left == null) left = right;
        paddings = { top, right, bottom, left };
      }
      this._paddings = paddings;
    }
  });

  Object.defineProperty(this, 'paddingLeft', {
    get() {
      return this.paddings.left;
    },
    set(paddingLeft) {
      this.paddings.left = paddingLeft;
    }
  });

  Object.defineProperty(this, 'paddingRight', {
    get() {
      return this.paddings.right;
    },
    set(paddingRight) {
      this.paddings.right = paddingRight;
    }
  });

  Object.defineProperty(this, 'paddingTop', {
    get() {
      return this.paddings.top;
    },
    set(paddingTop) {
      this.paddings.top = paddingTop;
    }
  });

  Object.defineProperty(this, 'paddingBottom', {
    get() {
      return this.paddings.bottom;
    },
    set(paddingBottom) {
      this.paddings.bottom = paddingBottom;
    }
  });

  this.findComponent = function(name) {
    if (this.class.name === name) return this;
    else if (this.parentComponent) return this.parentComponent.findComponent(name);
    else throw new Error(`component '${name}' not found`);
  };
});

module.exports = Component;
