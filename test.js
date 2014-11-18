var co = require('co');
var Component = require('./component');
var Report = require('./');
var Box = require('./box');
var Text = require('./text');

var report = Report.create();
var box = Box.create();
report.addChildComponent(box);
var text = Text.create('Hello');
box.addChildComponent(text);

co(function *() {
  yield report.renderToPDFFile('test.pdf');
}).catch(function(err) {
  console.error(err.stack);
});
