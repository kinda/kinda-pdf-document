'use strict';

let _ = require('lodash');
let Component = require('./');
let Title = require('./title');
let Paragraph = require('./paragraph');
let Table = require('./table').Table;

let DocumentBody = Component.extend('DocumentBody', function() {
  this.defaults = {
    alignment: 'left'
  };

  Object.defineProperty(this, 'components', {
    get() {
      if (!this._components) this._components = [];
      return this._components;
    }
  });

  this.addTitle = function(value, options, fn) {
    if (!(_.isNumber(value) || _.isString(value))) {
      fn = options;
      options = value;
      value = undefined;
    }
    let title = Title.create(this, options, fn);
    if (value != null) title.addText(value);
    this.components.push(title);
    return title;
  };

  this.addParagraph = function(value, options, fn) {
    if (!(_.isNumber(value) || _.isString(value))) {
      fn = options;
      options = value;
      value = undefined;
    }
    let paragraph = Paragraph.create(this, options, fn);
    if (value != null) paragraph.addText(value);
    this.components.push(paragraph);
    return paragraph;
  };

  this.addTable = function(options, fn) {
    let table = Table.create(this, options, fn);
    this.components.push(table);
    return table;
  };

  this.render = function(block) {
    this.components.forEach(component => {
      component.render(block);
    });
  };
});

module.exports = DocumentBody;
