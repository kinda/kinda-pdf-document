var Component = require('./component');
var Table = require('./table');

var report = Component.create({ fontTypeFace: 'Times' });
// console.log(report);

var table = Table.create();
// console.log(table);
report.addChildComponent(table);
console.log(report.fontTypeFace);// 'Times'
console.log(table.fontTypeFace); // 'Times'

table.fontTypeFace = 'New Roma';
console.log(report.fontTypeFace);// 'Times'
console.log(table.fontTypeFace); // 'New Roma'


console.log(report.fontSize);
console.log(table.fontSize);

table.fontSize = 14;
console.log(report.fontSize);
console.log(table.fontSize);
