'use strict';

// ./node_modules/.bin/babel-node --harmony examples/document-block.js

let nodePath = require('path');
let Document = require('../src/block/document');

(async function() {
  await Document.generatePDFFile(
    nodePath.join(__dirname, 'test.pdf'),
    { width: 210, height: 297 },
    function(document) {
      for (let i = 1; i <= 80; i++) {
        document.addRow({ height: undefined }, row => {
          row.addColumn({ width: 50 }, col => {
            col.height = 5;
            document.draw(pdf => {
              let x = col.mmToPt(col.x);
              let y = col.mmToPt(col.y);
              pdf.text('A' + i, x, y, { width: col.mmToPt(col.width) });
            });
          });
          row.addColumn({ width: 50 }, col => {
            document.draw(pdf => {
              let x = col.mmToPt(col.x);
              let y = col.mmToPt(col.y);
              pdf.text('B' + i, x, y, { width: col.mmToPt(col.width) });
            });
          });
        });
      }
    }
  );
  console.log('Document generated');
})().catch(function(err) {
  console.error(err.stack || err);
});

// setTimeout(function() {}, 1000000000);
