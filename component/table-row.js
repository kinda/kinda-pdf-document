"use strict";

var _ = require('lodash');
var Component = require('./');
var TableCell = require('./table-cell');

/**
 * Class TableRow, extend from {@link module:kinda-document.Component Component}.
 * @class TableRow
 * @memberof module:kinda-document
 * @param {Object} options - Init options.
 * @param {Function} fn - Init function.
 * @example // how to create instance?
 * var instance = TableRow.create({}, function() {});
 */
var TableRow = Component.extend('TableRow', function() {
  Object.defineProperty(this, 'cells', {
    get: function() {
      if(!this._cells) this._cells = [];
      return this._cells;
    }
  });

  /**
   * Add a {@link module:kinda-document.TableCell TableCell} instance to self.
   *
   * @function addCell
   * @instance
   * @memberof module:kinda-document.TableRow
   * @param {Object=} options - Init config options.
   * @param {Function} fn - Init function.
   * @returns {TableCell} {@link module:kinda-document.TableCell TableCell} instance
   */
  this.addCell = function(value, options, fn) {
    if (!_.isString(value)) {
      fn = options;
      options = value;
      value = undefined;
    }

    var cell = TableCell.create(this, options, fn);

    if (value) cell.addText(value);

    this.cells.push(cell);

    var table = this.findComponent('Table');
    if (this.cells.length > table.columns.length) {
      table.columns.push({ width: undefined });
    }

    return cell;
  };

  this.setCursor = function(block) {
    var table = this.findComponent('Table');
    var tableWidth = 0;

    table.columns.forEach(function(column) {
      tableWidth += column.computedWidth;
    });
    block.width = tableWidth;
    // TODO: center alignment
    // block.x =
    block.x = block.document.left;
  };

  this.render = function(block) {
    var table = this.findComponent('Table');

    var tableWidth = 0;
    table.columns.forEach(function(column) {
      tableWidth += column.computedWidth;
    });

    block.width = tableWidth;

    var tableLeft;
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

    this.cells.forEach(function(cell, index) {
      var thisColumn = table.columns[index];
      var width = thisColumn.computedWidth;
      var options = {
        width: width,
        paddings: cell.paddings
      };
      block.addColumn(options, function(block) {
        cell.render(block);
      }.bind(this));
    }.bind(this));

    // Render borders
    block.x = tableLeft;

    block.document.draw(function(pdf) {
      pdf.lineWidth(table.borderWidth);
      pdf.strokeColor(table.borderColor);

      pdf.rect(
        block.mmToPt(block.x),
        block.mmToPt(block.y),
        block.mmToPt(block.width),
        block.mmToPt(block.height)
      );
      pdf.stroke();

      var x = block.x;
      for (var i = 0; i < table.columns.length - 1; i++) {
        x += table.columns[i].computedWidth;
        pdf.moveTo(block.mmToPt(x), block.mmToPt(block.y));
        pdf.lineTo(block.mmToPt(x), block.mmToPt(block.y + block.height));
        pdf.stroke();
      }
    });
  };
});

module.exports = TableRow;
