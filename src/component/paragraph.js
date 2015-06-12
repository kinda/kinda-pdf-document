'use strict';

let Box = require('./box');

let Paragraph = Box.extend('Paragraph', function() {
  this.defaults = {
    marginTop: 5
    // marginBottom: 5
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

module.exports = Paragraph;
