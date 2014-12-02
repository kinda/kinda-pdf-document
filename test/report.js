var co = require('co');
var Report = require('../');
var Table = require('../table');
var _ = require('lodash');

var fonts = ['Times-Roman', 'Courier', 'Helvetica'];
var fontSizes = [24, 14, 18];
// var fontSizes = [24, 24, 24];
var colors = ['red', '#FFCC33', 'grey'];

var getFontSize = function(index, pdf) {
  console.log(pdf);
  var baseSize = pdf.fontSize;
  console.log(pdf);
  return parseInt(baseSize * (1 + fontSizes[i%fontSizes.length]));
};


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
  var options = { columns: [{ width: 40 }, { width: 40 }, { width: 40 }] };
  body.addTable(options, function(table) {
    table.addHeader(function(header) {
      header.addRow(function(row) {
        row.addCell(function(cell) {
          cell.addText('Column A');
        });
        row.addCell(function(cell) {
          cell.addText('Column B');
        });
        row.addCell(function(cell) {
          cell.addText('Column C');
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
            cell.addText('Bye', {
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
