"use strict";

var _ = require('lodash');
var _ = require('lodash');
var KindaObject = require('kinda-object');

/**
 * Class Font, extend from KindaObject.
 *
 * @class Font
 * @memberof module:kinda-document
 * @param {String} name - Font name.
 * @param {Array=} style - If passed, the value should be the subset of ['bold', 'italic'].
 * @param {String} path - File path of font.
 * @param {String} postScriptName - font's PostScript Name, If the font is
 * {@link http://en.wikipedia.org/wiki/TrueType#TrueType_Collection TrueType Collection},
 * the name should be the font style.
 * @example // how to create instance?
 * var instance = Font.create({}, function() {});
 */
var Font = KindaObject.extend('Font', function() {
  this.setCreator(function(name, style, path, postScriptName) {
    this.name = name;
    this.style = style;
    this.path = path;
    this.postScriptName = postScriptName;
  });

  Object.defineProperty(this, 'name', {
    get: function() {
      return this._name;
    },
    set: function(name) {
      this._name = name;
    }
  });

  Object.defineProperty(this, 'style', {
    get: function() {
      return this._style;
    },
    set: function(style) {
      if (_.isString(style)) style = [style];
      this._style = style;
    }
  });

  Object.defineProperty(this, 'path', {
    get: function() {
      return this._path;
    },
    set: function(path) {
      this._path = path;
    }
  });

  Object.defineProperty(this, 'postScriptName', {
    get: function() {
      return this._postScriptName;
    },
    set: function(postScriptName) {
      this._postScriptName = postScriptName;
    }
  });
});

module.exports = Font;
