'use strict';

let Box = require('./box');

let Title = Box.extend('Title', function() {
  this.defaults = {
    marginTop: 10,
    // marginBottom: 5,
    fontSize: 14,
    fontStyle: ['bold']
  };

  let superRender = this.render;
  this.render = function(block) {
    if (block.y !== block.document.top) {
      // marginTop should be ignored when y is at the top of the page
      block.y += this.margins.top;
    }
    block.addRow({}, rowBlock => {
      superRender.call(this, rowBlock);
    });
    // block.y += this.margins.bottom;
  };
});

module.exports = Title;
