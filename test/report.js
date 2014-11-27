var co = require('co');
var Report = require('../');
var Table = require('../table');

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
  var options = { columns: [{ width: 40 }, { width: 40 }] };
  body.addTable(options, function(table) {
    table.addHeader(function(header) {
      header.addRow(function(row) {
        row.addCell(function(cell) {
          cell.addText('Column A');
        });
        row.addCell(function(cell) {
          cell.addText('Column B');
        });
      });
    });

    table.addBody(function(body) {
      for (var i = 1; i <= 40; i++) {
        body.addRow(function(row) {
          row.addCell(function(cell) {
            cell.addText('Hello\nBonjour');
          });
          row.addCell(function(cell) {
            cell.addText('Bye');
          });
        });
      }
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
