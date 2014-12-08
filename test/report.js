var _ = require('lodash');
var co = require('co');
var Report = require('../');
var Table = require('../component/table');

var fonts = ['Helvetica', 'Alegreya', 'Thabit']; // 'Times-Roman',
var fontSizes = [10, 10, 10];
// var fontSizes = [36, 36, 36];
var colors = ['red', '#FFCC33', 'grey'];
var fontStyles = ['bold', 'italic', ['italic', 'bold'], 'bold', 'italic'];
// var fontStyles = [];
var options = {
  fontTypeFace: 'Helvetica',
  title: 'Lunch Friday 20th, 2014',
  author: 'fishead <zhchuan7@gmail.com>',
  subject: 'Just a report',
  keywords: 'Visitor PDFKit Node.js',
  orientation: 'portrait'
}

var report = Report.create(options);
report.registerFont('Alegreya', [], 'test/font/Alegreya-Regular.ttf');
report.registerFont('Alegreya', ['bold'], 'test/font/Alegreya-Bold.ttf');
report.registerFont('Alegreya', ['italic'], 'test/font/Alegreya-Italic.ttf');
report.registerFont('Alegreya', ['bold', 'italic'], 'test/font/Alegreya-BoldItalic.ttf');

report.registerFont('Thabit', [], 'test/font/Thabit.ttf');
report.registerFont('Thabit', ['bold'], 'test/font/Thabit-Bold.ttf');
report.registerFont('Thabit', ['italic'], 'test/font/Thabit-Oblique.ttf');
report.registerFont('Thabit', ['bold', 'italic'], 'test/font/Thabit-BoldOblique.ttf');

// report.registerFont('wqy-zenhei', [], './font/wqy-zenhei.ttc', 'wqy-zenhei');
// report.registerFont('wqy-zenhei', [], './font/wqy-zenhei.ttc', 'wqy-zenhei');
// report.registerFont('wqy-zenhei', [], './font/wqy-zenhei.ttc', 'wqy-zenhei');
// report.registerFont('wqy-zenhei', [], './font/wqy-zenhei.ttc', 'wqy-zenhei');


report.addHeader(function(header) {
  header.addText(
    '{{reportTitle}}'
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
  // body.addTitle('...');

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
            cell.addText(fonts[i%fonts.length] + '-' + fontStyles[i%fontStyles.length], {
              fontTypeFace: fonts[i%fonts.length],
              fontSize: fontSizes[i%fontSizes.length],
              color: colors[i%colors.length],
              fontStyle: fontStyles[i%fontStyles.length]
            });
          });
          row.addCell(function(cell) {
            cell.addText(fonts[i%fonts.length] + '-' + fontStyles[i%fontStyles.length], {
              fontTypeFace: fonts[i%fonts.length],
              fontSize: fontSizes[i%fontSizes.length],
              color: colors[i%colors.length],
              fontStyle: fontStyles[i%fontStyles.length]
            });
          });
          row.addCell(function(cell) {
            cell.addText(fonts[i%fonts.length] + '-' + fontStyles[i%fontStyles.length], {
              fontTypeFace: fonts[i%fonts.length],
              fontSize: fontSizes[i%fontSizes.length],
              color: colors[i%colors.length],
              fontStyle: fontStyles[i%fontStyles.length]
            });
          });
          row.addCell(function(cell) {
            cell.addText(fonts[i%fonts.length] + '-' + fontStyles[i%fontStyles.length], {
              fontTypeFace: fonts[i%fonts.length],
              fontSize: fontSizes[i%fontSizes.length],
              color: colors[i%colors.length],
              fontStyle: fontStyles[i%fontStyles.length]
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
