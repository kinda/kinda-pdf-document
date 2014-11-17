var Component = require('./component');

var report = Component.create({ fontTypeFace: 'Times' });

var table = Component.create();

report.addChild(table);

console.log(table.fontTypeFace); // 'Times'
