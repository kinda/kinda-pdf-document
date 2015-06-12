'use strict';

let _ = require('lodash');
let KindaObject = require('kinda-object');

let Font = KindaObject.extend('Font', function() {
  this.creator = function(name, style, path, postScriptName) {
    this.name = name;
    this.style = style;
    this.path = path;
    this.postScriptName = postScriptName;
  };

  Object.defineProperty(this, 'name', {
    get() {
      return this._name;
    },
    set(name) {
      this._name = name;
    }
  });

  Object.defineProperty(this, 'style', {
    get() {
      return this._style;
    },
    set(style) {
      if (_.isString(style)) style = [style];
      this._style = style;
    }
  });

  Object.defineProperty(this, 'path', {
    get() {
      return this._path;
    },
    set(path) {
      this._path = path;
    }
  });

  Object.defineProperty(this, 'postScriptName', {
    get() {
      return this._postScriptName;
    },
    set(postScriptName) {
      this._postScriptName = postScriptName;
    }
  });
});

module.exports = Font;
