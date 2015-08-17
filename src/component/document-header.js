'use strict';

let Box = require('./box');

let DocumentHeader = Box.extend('DocumentHeader', function() {
  this.defaults = {
    marginBottom: 5,
    alignment: 'left'
  };

  let superRender = this.render;
  this.render = function(block) {
    block.addRow({ isFloating: true }, rowBlock => {
      rowBlock.y = rowBlock.document.contentTop;
      superRender.call(this, rowBlock);
    });
  };
});

module.exports = DocumentHeader;
