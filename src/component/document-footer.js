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
      superRender.call(this, rowBlock);
      rowBlock.y = rowBlock.document.contentTop + rowBlock.document.contentHeight - rowBlock.height;
    });
  };
});

module.exports = DocumentFooter;
