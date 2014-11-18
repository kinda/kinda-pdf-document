var co = require('co');
var Component = require('./component');
var Report = require('./');
var ReportHeader = require('./report-header');
var Box = require('./box');
var Text = require('./text');

var report = Report.create();

var reportHeader = ReportHeader.create();
report.addChildComponent(reportHeader);
var text = Text.create('Hello', { alignment: 'left' });
reportHeader.addChildComponent(text);
var text = Text.create('Hello', { alignment: 'center' });
reportHeader.addChildComponent(text);
var text = Text.create('Hello', { alignment: 'right' });
reportHeader.addChildComponent(text);

for (var i = 0; i < 300; i++) {
  var box = Box.create();
  report.addChildComponent(box);
  var text = Text.create(i, { alignment: 'left' });
  box.addChildComponent(text);
  var text = Text.create(i, { alignment: 'center' });
  box.addChildComponent(text);
  var text = Text.create(i, { alignment: 'right' });
  box.addChildComponent(text);
}

co(function *() {
  yield report.renderToPDFFile('test.pdf');
}).catch(function(err) {
  console.error(err.stack);
});

// PDFDocument = require('pdfkit');
//
// var doc = new PDFDocument;
// doc.fontSize(36);
// var width = doc.widthOfString('');
// console.log(width);
//
setTimeout(function() {}, 1000000000);
