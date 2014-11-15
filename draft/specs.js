// === API ===

var report = KindaReport.create();

report.addHeader(function(header) {
  header.addText(
    'Lunch Friday 20th, 2014',
    { alignment: 'left', style: 'bold' }
  );
  header.addText(
    '214 chekings',
    { alignment: 'center' }
  );
  header.addText(
    'Page 1 of 1',
    { alignment: 'right' }
  );
});

report.addTable(function(table) {
  table.addHeader(function(header) {
    header.addCell().addText('Date');
    header.addCell().addText('Participant');
    header.addCell().addText('Status');
  });
  table.addRow(function(row) {
    row.addCell().addText('01/01/01 10:20');
    row.addCell().addText('Jean Durand');
    row.addCell().addText('Checked');
  });
  // ...
  table.addFooter(function(footer) {
    footer.addCell().addText('...');
    footer.addCell().addText('...');
    footer.addCell().addText('...');
  });
});

yield report.renderToPDFFile('report.pdf');

// === Classes hierarchy (not sure about that) ===

// Component
//   KindaReport
//   Table
//   TableRow
//     TableHeader
//     TableFooter
//   Box
//     ReportHeader
//     ReportFooter
//     TableCell
//   Text

// === Properties ===

// Component
//   parentComponent: undefined
//   childComponents: []
//   fontTypeFace: 'Helvetica'
//   fontSize: 10
//   fontStyle: [] // could be ['bold', 'italic']
//   alignment: 'left' // could be 'center' or 'right'
//   color: 'black' // could be '#abc'
//   backgroundColor: 'white'

// KindaReport
//   title: undefined
//   width: ? // 21 cm
//   height: ? // 29.7 cm
//   paddingTop: ? // 1 cm
//   paddingBottom: ? // 1 cm
//   paddingLeft: ? // 1 cm
//   paddingRight: ? // 1 cm
//   orientation: 'portrait' // could be also 'landscape'

// ReportHeader and ReportFooter

// Table
//   columns: []
//   paddingTop: ? // 1 mm
//   paddingBottom: ? // 1 mm
//   paddingLeft: ? // 1 mm
//   paddingRight: ? // 1 mm
//   borderWidth: ? // 0.25 pt
//   borderColor: 'gray'
//   spaceBefore: ? // 0.5 cm

// TableHeader and TableFooter
//   fontStyle: ['bold']

// TableRow

// TableCell
//   span: 1 // implemented in the future?

// Text
//   value: undefined

// === Methods ===

var report = KindaReport.create([options], [fn]); // => KindaReport

var reportHeader = report.addHeader([options], [fn]); // => ReportHeader

var reportFooter = report.addFooter([options], [fn]); // => ReportFooter

var table = report.addTable([options], [fn]); // => Table

var tableHeader = table.addHeader([options], [fn]); // => TableHeader

var tableFooter = table.addFooter([options], [fn]); // => TableFooter

var tableRow = table.addRow([options], [fn]); // => TableRow

var tableCell = tableRow.addCell([options], [fn]); // => TableCell

var text = tableCell.addText(value, [options], [fn]); // => Text

yield report.renderToPDFFile(path);

var blob = yield report.renderToPDFBlob();

// === Remarks ===

// Reports and tables can have multiple headers and footers

// Some columns can have a fixed width:
//   columns: [{ width: 200 }, { width: undefined }, { width: 200 }]

// Text values can contains special variables:
//   {{reportTitle}}
//   Page {{pageNumber}} of {{numberOfPages}}

// For now, only one table is allowed but this may change in the future
