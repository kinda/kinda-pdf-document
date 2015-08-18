'use strict';

let KindaImageInfo = require('kinda-image-info');
let Component = require('./');

let Image = Component.extend('Image', function() {
  let superCreator = this.creator;
  this.creator = function(parent, path, options, fn) {
    if (path == null) throw new Error('undefined path');
    superCreator.call(this, parent, options, fn);
    this.path = path;
  };

  this.render = function(block) {
    let height = this.computeHeight(block);
    if (height > block.height) block.height = height;
    block.document.draw(pdf => {
      let x = block.x + block.paddings.left;
      let width = block.width - block.paddings.left - block.paddings.right;
      if (this.alignment === 'center') {
        x += (width - this.computeWidth()) / 2;
      } else if (this.alignment === 'right') {
        x += width - this.computeWidth();
      }
      let y = block.y + block.paddings.top;
      let info = this._getImageInfo();
      let scale = 72 / info.resolution;
      pdf.image(this.path, block.mmToPt(x), block.mmToPt(y), { scale });
    });
  };

  this.computeWidth = function() {
    let info = this._getImageInfo();
    let width = info.width / info.resolution * 25.4;
    return width;
  };

  this.computeHeight = function() {
    let info = this._getImageInfo();
    let height = info.height / info.resolution * 25.4;
    return height;
  };

  this._getImageInfo = function() {
    if (!this._imageInfo) {
      this._imageInfo = KindaImageInfo.create(this.path).getSync();
    }
    return this._imageInfo;
  };
});

module.exports.Image = Image;
