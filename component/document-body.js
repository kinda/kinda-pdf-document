"use strict";

var _ = require('lodash');
var Component = require('./');
var Title = require('./title');
var Table = require('./table').Table;

/**
 * Class DocumentBody, extend from {@link module:kinda-document.Component Component}.
 * 
 * @class DocumentBody
 * @memberof module:kinda-document
 * @param {Object} options - Init options.
 * @param {Function} fn - Init function.
 * @example how to create instance
 * var instance = DocumentBody.create({}, function() {});
 */
var DocumentBody = Component.extend('DocumentBody', function() {
  this.defaults = {
    alignment: 'left'
  };

  Object.defineProperty(this, 'components', {
    get: function() {
      if(!this._components) this._components = [];
      return this._components;
    }
  });

  /**
   * Add a {@link module:kinda-document.Title Title} instance to self.
   * If value is passed, will add a {@link module:kinda-document.Text Text}
   * instance to {@link module:kinda-document.Title Title} instance.
   * addTitle(value) Equals to addTitle().addText(value).
   *
   * @function addTitle
   * @instance
   * @memberof module:kinda-document.DocumentBody
   * @param {String=} value - Text value add to self if passed.
   * @param {Object=} options - Init config options.
   * @param {Function=} fn - Init function.
   * @returns {Title} {@link module:kinda-document.Title Title} instance
   */
  this.addTitle = function(value, options, fn) {
    if (!_.isString(value)) {
      fn = options;
      options = value;
      value = undefined;
    }
    var title = Title.create(this, options, fn);
    if (value) title.addText(value);
    this.components.push(title);
    return title;
  };

  /**
   * Add a {@link module:kinda-document.Table Table} instance to self.
   *
   * @function addTable
   * @instance
   * @memberof module:kinda-document.DocumentBody
   * @param {Object=} options - Init config options.
   * @param {Function} fn - Init function.
   * @returns {Table} {@link module:kinda-document.Table Table} instance
   */
  this.addTable = function(options, fn) {
    var table = Table.create(this, options, fn);
    this.components.push(table);
    return table;
  };

  this.render = function(block) {
    this.components.forEach(function(component) {
      component.render(block);
    }.bind(this));
  };
});

module.exports = DocumentBody;
