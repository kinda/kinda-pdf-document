var nodePath = require('path');
var _ = require('lodash');
var co = require('co');
var Report = require('../');
var Table = require('../component/table');

var fonts = ['Helvetica', 'Alegreya', 'Thabit']; // 'Times-Roman',
var fontSizes = [10, 14, 24];
// var fontSizes = [36, 36, 36];
var colors = ['red', '#FFCC33', 'grey'];
var fontStyles = ['bold', 'italic'];

var options = {
  fontTypeFace: 'Helvetica',
  title: 'Lunch Friday 20th, 2014',
  author: 'fishead <zhchuan7@gmail.com>',
  subject: 'Just a report',
  keywords: 'Visitor PDFKit Node.js',
  orientation: 'portrait'
}
var report = Report.create(options);

report.registerFont('Alegreya', [],
  nodePath.join(__dirname, 'fonts', 'Alegreya-Regular.ttf')
);
report.registerFont('Alegreya', ['bold'],
  nodePath.join(__dirname, 'fonts', 'Alegreya-Bold.ttf')
);
report.registerFont('Alegreya', ['italic'],
  nodePath.join(__dirname, 'fonts', 'Alegreya-Italic.ttf')
);
report.registerFont('Alegreya', ['bold', 'italic'],
  nodePath.join(__dirname, 'fonts', 'Alegreya-BoldItalic.ttf')
);
report.registerFont('Thabit', [],
  nodePath.join(__dirname, 'fonts', 'Thabit.ttf')
);
report.registerFont('Thabit', ['bold'],
  nodePath.join(__dirname, 'fonts', 'Thabit-Bold.ttf')
);
report.registerFont('Thabit', ['italic'],
  nodePath.join(__dirname, 'fonts', 'Thabit-Oblique.ttf')
);
report.registerFont('Thabit', ['bold', 'italic'],
  nodePath.join(__dirname, 'fonts', 'Thabit-BoldOblique.ttf')
);
// report.registerFont('Chalkboard', [],
//   nodePath.join(__dirname, 'fonts', 'Chalkboard.ttc'), 'Chalkboard'
// );
// report.registerFont('Chalkboard', ['bold'],
//  nodePath.join(__dirname, 'fonts', 'Chalkboard.ttc'), 'Chalkboard-Bold'
// );

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
  body.addTitle().addText('Basic Table');

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

      header.addRow(function(row) {
        row.addCell('header cell');
        row.addCell('added');
        row.addCell('by');
        row.addCell('shortcut');
      });
    });

    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('cell');
        row.addCell('added');
        row.addCell('by');
        row.addCell('shortcut');
      });

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

   body.addTitle().addText('Basic Table');

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
       for (var i = 1; i <= 20; i++) {
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
