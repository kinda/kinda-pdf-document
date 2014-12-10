"use strict";

var _ = require('lodash');
var Component = require('./');
var Text = require('./text').Text;

/**
 * Class Box, extend from {@link module:kinda-document.Component Component}.
 *
 * @class Box
 * @memberof module:kinda-document
 * @param {Object} options - Init options.
 * @param {Function} fn - Init function.
 * @example // how to create instance?
 * var instance = Box.create({}, function() {});
 */
var Box = Component.extend('Box', function() {
  Object.defineProperty(this, 'components', {
    get: function() {
      if(!this._components) this._components = [];
      return this._components;
    }
  });

  /**
   * Add {@link module:kinda-document.Text Text} to self.
   * 
   * @function addText
   * @instance
   * @memberof module:kinda-document.Box
   * @param {String} value - Path for output generated PDF file.
   * @param {Object} options - Init config options.
   * @param {Function} fn - Init function to create {@link module:kinda-document.Text Text} instance.
   * @returns {Text} {@link module:kinda-document.Text Text} instance
   */
  this.addText = function(value, options, fn) {
    var text = Text.create(this, value, options, fn);
    this.components.push(text);
    return text;
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
