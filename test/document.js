var misc = require('../misc');
var Document = require('../document');

Document.generatePDFFile(
  'test.pdf',
  { width: 210, height: 297 },
  function(document) {
    for (var i = 1; i <= 80; i++) {
      document.addRow({ height: undefined }, function(row) {
        row.addColumn({ width: 50 }, function(col) {
          col.height = 5;
          col.draw(function(pdf) {
            var x = col.mmToPt(col.x);
            var y = col.mmToPt(col.y);
            pdf.text('A' + i, x, y, { width: col.mmToPt(col.width) });
          });
        });
        row.addColumn({ width: 50 }, function(col) {
          col.draw(function(pdf) {
            var x = col.mmToPt(col.x);
            var y = col.mmToPt(col.y);
            pdf.text('B' + i, x, y, { width: col.mmToPt(col.width) });
          });
        });
      });
    }
  }
);

setTimeout(function() {}, 1000000000);
