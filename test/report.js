var _ = require('lodash');
var co = require('co');
var Report = require('../');
var Table = require('../component/table');

var fonts = ['Helvetica']; // 'Times-Roman',
var fontSizes = [10, 10, 10];
// var fontSizes = [36, 36, 36];
var colors = ['red', '#FFCC33', 'grey'];
var options = {
  fontTypeFace: 'Helvetica',
  title: 'Lunch Friday 20th, 2014',
  author: 'fishead <zhchuan7@gmail.com>',
  subject: 'Just a report',
  keywords: 'Visitor PDFKit Node.js',
  orientation: 'portrait'
}

var report = Report.create(options);

report.addHeader(function(header) {
  header.addText(
    '{{reportTitle}}',
    { style: 'bold' }
  );
  header.addText(
    '5 chekings',
    { alignment: 'center' }
  );
  header.addText(
    'Page {{pageNumber}} of {{numberOfPages}}',
    { alignment: 'right' }
  );
});

report.addBody(function(body) {
  var options = {
    columns: [
      { width: undefined }, { width: undefined },
      { width: undefined }, { width: undefined }
    ],
    alignment: 'left'
  };
  body.addTable(options, function(table) {
    table.addHeader({ alignment: 'center' }, function(header) {
      header.addRow(function(row) {
        row.addCell(function(cell) {
          cell.addText('A');
        });
        row.addCell(function(cell) {
          cell.addText('B');
        });
        row.addCell(function(cell) {
          cell.addText('C');
        });
        row.addCell(function(cell) {
          cell.addText('D');
        });
      });
    });

    table.addBody(function(body) {
      for (var i = 1; i <= 50; i++) {
        body.addRow(function(row) {
          row.addCell(function(cell) {
            cell.addText(i, {
              fontTypeFace: fonts[i%fonts.length],
              fontSize: fontSizes[i%fontSizes.length],
              color: colors[i%colors.length]
            });
          });
          row.addCell(function(cell) {
            cell.addText('Bbbbbbbbbbbbbbbbbbbbb', {
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
          cell.addText('fooooooter');
        });

        row.addCell(function(cell) {
          cell.addText('footer');
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
  console.log('Report generated');
}).catch(function(err) {
  console.error(err.stack);
});

setTimeout(function() {}, 1000000000);
