var co = require('co');
var Report = require('../');
var Table = require('../table');
var _ = require('lodash');

var fonts = ['Times-Roman', 'Helvetica'];
var fontSizes = [24, 14, 18];
// var fontSizes = [36, 36, 36];
var colors = ['red', '#FFCC33', 'grey'];


var report = Report.create();

report.addHeader(function(header) {
  header.addText(
    'Lunch Friday 20th, 2014',
    { alignment: 'left', style: 'bold' }
  );
  header.addText(
    '5 chekings',
    { alignment: 'center' }
  );
  header.addText(
    'Page 1 of 1',
    { alignment: 'right' }
  );
});

report.addBody(function(body) {
  var options = { columns: [{ width: 40 }, { width: undefined }, { width: 70 }, { width: undefined }] };
  body.addTable(options, function(table) {
    table.addHeader(function(header) {
      header.addRow(function(row) {
        row.addCell(function(cell) {
          cell.addText('Size 40 Column A');
        });
        row.addCell(function(cell) {
          cell.addText('Automatic Column B');
        });
        row.addCell(function(cell) {
          cell.addText('Size 70 Column C');
        });
        row.addCell(function(cell) {
          cell.addText('Automatic Column D');
        });
      });
    });

    table.addBody(function(body) {
      for (var i = 1; i <= 40; i++) {
        body.addRow(function(row) {
          row.addCell(function(cell) {
            cell.addText('Hello\nBonjour', {
              fontTypeFace: fonts[i%fonts.length],
              fontSize: fontSizes[i%fontSizes.length],
              color: colors[i%colors.length]
            });
          });
          row.addCell(function(cell) {
            cell.addText('It is a looooooooooooooooooong story', {
              fontTypeFace: fonts[i%fonts.length],
              fontSize: fontSizes[i%fontSizes.length],
              color: colors[i%colors.length]
            });
          });
          row.addCell(function(cell) {
            cell.addText('Blah', {
              fontTypeFace: fonts[i%fonts.length],
              fontSize: fontSizes[i%fontSizes.length],
              color: colors[i%colors.length]
            });
          });

          row.addCell(function(cell) {
            cell.addText('Pirate Bay', {
              fontTypeFace: fonts[i%fonts.length],
              fontSize: fontSizes[i%fontSizes.length],
              color: colors[i%colors.length]
            });
          });
        });
      }
    });

    table.addFooter(function(footer) {
      footer.addRow(function(row) {
        row.addCell(function(cell) {
          cell.addText('footer abc');
        });

        row.addCell(function(cell) {
          cell.addText('footer efg');
        });

        row.addCell(function(cell) {
          cell.addText('footer ijk');
        });

        row.addCell(function(cell) {
          cell.addText('footer mno');
        });
      });
    });
  });
});

report.addFooter(function(footer) {
  footer.addText(
    'Alpha Visa Congrès'
  );
  footer.addText(
    '01/01/2014 14:05',
    { alignment: 'right' }
  );
});

co(function *() {
  yield report.generatePDFFile('test.pdf');
}).catch(function(err) {
  console.error(err.stack);
});

setTimeout(function() {}, 1000000000);
