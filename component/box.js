"use strict";

var _ = require('lodash');
var Component = require('./');
var Text = require('./text').Text;

var Box = Component.extend('Box', function() {
  Object.defineProperty(this, 'components', {
    get: function() {
      if(!this._components) this._components = [];
      return this._components;
    }
  });

  this.addText = function(value, options, fn) {
    var text = Text.create(this, value, options, fn);
    this.components.push(text);
  };

  this.render = function(block) {
    this.components.forEach(function(component) {
      component.render(block);
    }.bind(this));
  };

  this.computeWidth = function(block) {
    if (this.components.length) {
      return _.max(this.components.map(function(component) {
        return component.computeWidth(block);
      }));
    } else return 0;
  };

  this.computeHeight = function(block) {
    if (this.components.length) {
      return _.max(this.components.map(function(component) {
        return component.computeHeight(block);
      }));
    } else return 0;
  };
});


module.exports = Box;
