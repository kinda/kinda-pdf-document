"use strict";

var _ = require('lodash');
var Component = require('../component');
var TableCell = require('./table-cell');

var TableRow = Component.extend('TableRow', function() {
  Object.defineProperty(this, 'cells', {
    get: function() {
      if(!this._cells) this._cells = [];
      return this._cells;
    }
  });

  this.addCell = function(options, fn) {
    var cell = TableCell.create(this, options, fn);
    this.cells.push(cell);

    var table = this.findComponent('Table');
    if (this.cells.length > table.columns.length) {
      table.columns.push({ width: undefined });
    }
  };

  this.render = function(block) {
    var table = this.findComponent('Table');

    this.cells.forEach(function(cell, index) {
      var thisColumn = table.columns[index];
      var cellWidth = thisColumn.width || thisColumn.computedWidth;

      var options = {
        width: cellWidth,
        padding: cell.padding
      };
      block.addColumn(options, function(block) {
        cell.render(block);
      }.bind(this));
    }.bind(this));


    // console.log(block.x, block.y, block.width, block.height);
    // console.log(block.mmToPt(block.x), block.mmToPt(block.y), block.mmToPt(block.width), block.mmToPt(block.height));


    // Render borders
    block.resetPosition();
    block.draw(function(pdf) {
      pdf.rect(
        block.mmToPt(block.x),
        block.mmToPt(block.y),
        block.mmToPt(block.width),
        block.mmToPt(block.height)
      );
      pdf.stroke();
      var x = block.x;
      for (var i = 0; i < table.columns.length - 1; i++) {
        x += table.columns[i].width || table.columns[i].computedWidth;
        pdf.moveTo(block.mmToPt(x), block.mmToPt(block.y));
        pdf.lineTo(block.mmToPt(x), block.mmToPt(block.y + block.height));
        pdf.stroke();
      }
    });
  };
});

module.exports = TableRow;
