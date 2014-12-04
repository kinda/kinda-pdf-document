var co = require('co');
var Report = require('../');
var Table = require('../table');
var _ = require('lodash');

var fonts = ['Times-Roman', 'Helvetica'];
var fontSizes = [12, 12, 12];
// var fontSizes = [36, 36, 36];
var colors = ['red', '#FFCC33', 'grey'];


var report = Report.create({ title: 'Lunch Friday 20th, 2014' });

report.addHeader(function(header) {
  header.addText(
    '{{reportTitle}}',
    { alignment: 'left', style: 'bold' }
  );
  header.addText(
    '5 chekings',
    { alignment: 'center' }
  );
  header.addText(
    'Page {{currentPage}} of {{totalPages}}',
    { alignment: 'right' }
  );
});

report.addBody(function(body) {
  var options = { columns: [{ width: undefined }, { width: undefined },
                            { width: undefined }, { width: undefined }] };
  body.addTable(options, function(table) {
    table.addHeader(function(header) {
      header.addRow(function(row) {
        row.addCell(function(cell) {
          cell.addText('Number');
        });
        row.addCell(function(cell) {
          cell.addText('B');
        });
        row.addCell(function(cell) {
          cell.addText('longer Column header');
        });
        row.addCell(function(cell) {
          cell.addText('Column D');
        });
      });
    });

    table.addBody(function(body) {
      for (var i = 1; i <= 50; i++) {
        body.addRow(function(row) {
          row.addCell(function(cell) {
            cell.addText("Drizzt Do'Urden", {
              fontTypeFace: fonts[i%fonts.length],
              fontSize: fontSizes[i%fontSizes.length],
              color: colors[i%colors.length]
            });
          });
          row.addCell(function(cell) {
            cell.addText('It', {
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
