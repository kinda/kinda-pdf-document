'use strict';

let _ = require('lodash');
let Component = require('./');
let TableCell = require('./table-cell');

let TableRow = Component.extend('TableRow', function() {
  Object.defineProperty(this, 'cells', {
    get() {
      if (!this._cells) this._cells = [];
      return this._cells;
    }
  });

  this.addCell = function(value, options, fn) {
    if (!(_.isNumber(value) || _.isString(value))) {
      fn = options;
      options = value;
      value = undefined;
    }

    let cell = TableCell.create(this, options, fn);

    if (value != null) cell.addText(value);

    this.cells.push(cell);

    let table = this.findComponent('Table');
    if (this.cells.length > table.columns.length) {
      table.columns.push({ width: undefined });
    }

    return cell;
  };

  this.setCursor = function(block) {
    let table = this.findComponent('Table');
    let tableWidth = 0;

    table.columns.forEach(function(column) {
      tableWidth += column.computedWidth;
    });
    block.width = tableWidth;
    // TODO: center alignment
    // block.x =
    block.x = block.document.left;
  };

  this.render = function(block) {
    let table = this.findComponent('Table');

    let tableWidth = 0;
    table.columns.forEach(function(column) {
      tableWidth += column.computedWidth;
    });

    block.width = tableWidth;

    let tableLeft;
    switch (table.alignment) {
      case 'left':
        tableLeft = block.document.left;
        break;
      case 'center':
        tableLeft = block.document.left + (block.document.width - tableWidth) / 2;
        break;
      case 'right':
        tableLeft = block.document.left + block.document.width - tableWidth;
        break;
      default:
        throw new Error('invalid table alignment');
    }

    block.x = tableLeft;

    this.cells.forEach((cell, index) => {
      let thisColumn = table.columns[index];
      let width = thisColumn.computedWidth;
      let options = { width, paddings: cell.paddings };
      block.addColumn(options, columnBlock => {
        cell.render(columnBlock);
      });
    });

    // Render borders

    block.x = tableLeft;

    block.document.draw(pdf => {
      pdf.lineWidth(table.borderWidth);
      pdf.strokeColor(table.borderColor);

      pdf.rect(
        block.mmToPt(block.x),
        block.mmToPt(block.y),
        block.mmToPt(block.width),
        block.mmToPt(block.height)
      );
      pdf.stroke();

      let x = block.x;
      for (let i = 0; i < table.columns.length - 1; i++) {
        x += table.columns[i].computedWidth;
        pdf.moveTo(block.mmToPt(x), block.mmToPt(block.y));
        pdf.lineTo(block.mmToPt(x), block.mmToPt(block.y + block.height));
        pdf.stroke();
      }
    });
  };
});

module.exports = TableRow;
