'use strict';

let Box = require('./box');

let DocumentFooter = Box.extend('DocumentFooter', function() {
  this.defaults = {
    marginTop: 5,
    alignment: 'left'
  };

  let superRender = this.render;
  this.render = function(block) {
    block.addRow({ isFloating: true }, rowBlock => {
      rowBlock.y = rowBlock.document.top + rowBlock.document.height + this.margins.top;
      superRender.call(this, rowBlock);
    });
  };
});

module.exports = DocumentFooter;
