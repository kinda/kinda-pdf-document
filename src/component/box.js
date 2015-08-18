'use strict';

let _ = require('lodash');
let Component = require('./');
let Text = require('./text').Text;
let Image = require('./image').Image;

let Box = Component.extend('Box', function() {
  Object.defineProperty(this, 'components', {
    get() {
      if (!this._components) this._components = [];
      return this._components;
    }
  });

  this.addText = function(value, options, fn) {
    let text = Text.create(this, value, options, fn);
    this.components.push(text);
    return text;
  };

  this.addImage = function(path, options, fn) {
    let image = Image.create(this, path, options, fn);
    this.components.push(image);
    return image;
  };

  this.render = function(block) {
    this.components.forEach(component => {
      component.render(block);
    });
  };

  this.computeWidth = function(block) {
    if (!this.components.length) return 0;
    return _.max(this.components.map(component => component.computeWidth(block)));
  };

  this.computeHeight = function(block) {
    let maxHeight = this.height || 0;
    for (let component of this.components) {
      let height = component.computeHeight(block);
      if (height > maxHeight) maxHeight = height;
    }
    return maxHeight;
  };
});

module.exports = Box;
