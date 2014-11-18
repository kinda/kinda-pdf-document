"use strict";

var _ = require('lodash');
var KindaObject = require('kinda-object');

var Component = KindaObject.extend('Component', function() {
  //   parentComponent: undefined
  //   childComponents: []
  //   Properties with inheritance:
  //     fontTypeFace: 'Helvetica'
  //     fontSize: 10 // pt
  //     fontStyle: [] // could be ['bold', 'italic']
  //     alignment: 'left' // could be 'center' or 'right'
  //     color: 'black' // could be '#abc'
  //     backgroundColor: 'white'
  //   Properties without inheritance:
  //     paddingTop: undefined // mm
  //     paddingBottom: undefined
  //     paddingLeft: undefined
  //     paddingRight: undefined
  //     marginTop: undefined // mm
  this.setCreator(function(options, fn) {
    if (_.isFunction(options)) {
      fn = options;
      options = undefined;
    }
    if (!options) options = {};

    this.fontTypeFace = options.hasOwnProperty('fontTypeFace') ? options.fontTypeFace : undefined;
    this.fontSize = options.hasOwnProperty('fontSize') ? options.fontSize : undefined;
    this.fontStyle = options.hasOwnProperty('fontStyle') ? options.fontStyle : undefined;
    this.alignment = options.hasOwnProperty('alignment') ? options.alignment : undefined;
    this.color = options.hasOwnProperty('color') ? options.color : undefined;
    this.backgroundColor = options.hasOwnProperty('backgroundColor') ? options.backgroundColor : undefined;

    if (fn) fn(this);
  });

  Object.defineProperty(this, 'parentComponent', {
    get: function() {
      return this._parentComponent;
    },
    set: function(value) {
      this._parentComponent = value;
    }
  });

  Object.defineProperty(this, 'childComponents', {
    get: function() {
      return this._childComponents;
    }
  });

  this.addChildComponent = function(value) {
    value._parentComponent = this;
    if(!this._childComponents) this._childComponents = [];
    this._childComponents.push(value);
  };

  Object.defineProperty(this, 'fontTypeFace', {
    get: function() {
      return this._fontTypeFace || this.parentComponent.fontTypeFace;
    },
    set: function(value) {
      this._fontTypeFace = value;
    }
  });

  Object.defineProperty(this, 'fontSize', {
    get: function() {
      return this._fontSize;
    },
    set: function(value) {
      this._fontSize = value;
    }
  });

  Object.defineProperty(this, 'fontStyle', {
    get: function() {
      return this._fontStyle;
    },
    set: function(value) {
      this._fontStyle = value;
    }
  });

  Object.defineProperty(this, 'alignment', {
    get: function() {
      return this._alignment;
    },
    set: function(value) {
      this._alignment = value;
    }
  });

  Object.defineProperty(this, 'color', {
    get: function() {
      return this._color;
    },
    set: function(value) {
      this._color = value;
    }
  });

  Object.defineProperty(this, 'backgroundColor', {
    get: function() {
      return this._backgroundColor;
    },
    set: function(value) {
      this._backgroundColor = value;
    }
  });
});


module.exports = Component;
