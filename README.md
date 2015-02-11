# kinda-pdf-document [![Build Status](https://travis-ci.org/kinda/kinda-pdf-document.svg?branch=master)](https://travis-ci.org/kinda/kinda-pdf-document)

Easily generate any kind of PDF documents such as reports including headers, footers, tables, etc.

**NOTE:** This documentation is still work in progress. Please help make it better by adding as much as you can and submitting a pull request.

## Installation

**NOTE:** This module is not yet published on npm.

```
$ npm install kinda-pdf-document
```

To use kinda-pdf-document, you need node `0.11.9` or higher for generator support, and must run node with the --harmony flag.

```
$ node --harmony test/pdf.js
```

## How to use it?

First you create an instance of `KindaPDFDocument`:

```js
var KindaPDFDocument = require('kinda-pdf-document');
var doc = KindaPDFDocument.create();
```

After, you can specify an header. It will apear on the top of every pages. You can do it like this:

```js
doc.addHeader(function(header) {
  // ...
});
```

Then you can add some text in the header:

```js
header.addText('A demo header');
```

Also you can align the text to center or right:

```js
header.addText('I will be in the center', { alignment: 'center' });
```

And you can do even more:

```js
header.addText('Page {{pageNumber}} of {{numberOfPages}}');
```

You see that there are two variables in the text. They will be replaced by real values when the PDF is rendered. For now, a few variables are supported:

  - `documentTitle`: can be specified when you create a document,
  - `pageNumber`: current page number,
  - `numberOfPages`: how many pages the document have.

Just wrap the variable in double braces `{{documentTitle}}` and that's all.

So, there is a header now. You can also add a footer:

```js
doc.addFooter(function(footer) {
  footer.addText('Kinda Ltd');
  footer.addText('December 10th, 2014', { alignment: 'right' });
});
```

Now, it's time to complete the document with a body. So here we come:

```js
doc.addBody(function(body) {
  // ... body is a big part!
});
```

If you want to add some text in the body, you can do it like this:

```js
body.addTitle('Simple title');
```

The most powerful feature is the ability to add tables:

```js
body.addTable(function(table) {// add a table
  table.addBody(function(tableBody) {// add a table body
    tableBody.addRow(function(tableRow) {// add a table row
      // add a table cell then add some text in it:
      tableRow.addCell().addText('simple cell');
      // or, use a convenient shortcut:
      tableRow.addCell('simple cell');
    });
  });
});
```

In the same way, you can add a table header and a table footer. If the table takes more than one page, the table header will appear on every pages but the table footer will only appear on the end of the table.

```js
table.addHeader(function(tableHeader) {
  tableHeader.addRow(function(tableRow) {
    // ...add a table cell and put something in it
  });
});

table.addFooter(function(tableFooter) {
  // ...
})
```

Finally, you can generate a PDF file. Just yield `doc.generatePDFFile()` to do the magic.

```js
yield doc.generatePDFFile('test.pdf');
```

And voilà! For more details, read the API documentation **[TODO]**.

## Dependencies

KindaPDFDocument uses [PDFKit](https://github.com/devongovett/pdfkit) to render the PDF.

## License

MIT
