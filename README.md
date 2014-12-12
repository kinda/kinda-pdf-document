# kinda-document

  PDF generator based on [pdfkit](https://github.com/pdfkit/pdfkit).

## Installation

  You can clone it in to your project

```
$ git clone https://github.com/kinda/kinda-document.git
```

  or simply install it use npm

```
$ npm install kinda-document
```

  to use kinda-document, you need node `0.11.9` or higher for generator support,
  and must run node with the --harmony flag.

 ```
 $ node --harmony doc.js
 ```

## How to use it?

  First we need to create an instance

```js
var KindaDocument = require('kinda-document');
// we create an instance called report
var doc = KindaDocument.create();
```

  now we have a instance called `doc`. After this, we can specify a document
  header to document, It will be apear on every page of pdf file, of course on
  the top of page. we can do it like this

```js
doc.addHeader(function(header) {
    // ...
});

```

  then we can add some text in the header.

```js
header.addText('a demo header');
```

  also wo can make it center or right align just pass an option object to it

```js
header.addText('I will be enter', { alignment: 'center' });
```

  we can do even more

```js
header.addText('Page {{pageNumber}} of {{numberOfPages}}');
```

  We can see that there are two variable in the text, It will be replaced by
  real value when render this PDF. for now we support several variable

  - `reportTitle` is the metadata of a PDF file, can be specified when create KindaDocument.
  - `pageNumber` current page number.
  - `numberOfPages` how many pages this document have


just wrap the variable in double braces `{{reportTitle}}` and that's all.
  
  So we have a page header now. We can also add a page footer to the document.
  Here is the code

```js
doc.addFooter(function(footer) {
    footer.addText('Kinda Ltd');
    footer.addText('December 10th, 2014', { alignment: 'right' });
});
```

  And we can see that there is no big diffrence than add page header.

  We need a body to complete whole page. So here we come

```js
doc.addBody(function(body) {
    // ... body is a big part
});
```

  If we want add some text to the body, we can do it like this

```js
body.addTitle('Simple title');
```

  the most power feature is add a table

```js
body.addTable(function(table) {// add a table
    table.addBody(function(tableBody) {// add a table body
        tableBody.addRow(function(tableRow) {// add a table row
            // add a table cell then add some text in it
            tableRow.addCell().addText('simple cell');
            // this is a convenient shortcut to add text in the table cell
            tableRow.addCell('simple cell');
        });
    });
});
```

  in the same way, wo can add table header and table footer, if the table spread
  to more than one page, the table header will display on every page, but the
  table footer only display on the end.

```js
table.addHeader(function(tableHeader) {
    tableHeader.addRow(function(tableRow) {
        // ...add table cell and put something in it
    });
});

table.addFooter(function(tableFooter) {
    // ...
})
```

  After we put everything we need in the document. we can use it to generate a
  pdf file. we call report.generatePDFFile('path/to/file.pdf') to do the magic.

```js
doc.generatePDFFile('test.pdf');
```

  and it's done! Want more detail, read the API document.

## License

  one license
