var nodePath = require('path');
var _ = require('lodash');
var co = require('co');
var Document = require('../');

var report = Document.create({
  title: 'KindaPDFDocument tests',
  author: 'Kinda Ltd',
  subject: 'KindaPDFDocument tests',
  keywords: 'Document, generator, PDFKit, Node.js',
});

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
report.registerFont('Chalkboard', [],
  nodePath.join(__dirname, 'fonts', 'Chalkboard.ttc'), 'Chalkboard'
);
report.registerFont('Chalkboard', ['bold'],
  nodePath.join(__dirname, 'fonts', 'Chalkboard.ttc'), 'Chalkboard-Bold'
);

report.addHeader(function(header) {
  header.addText(
    '{{documentTitle}}'
  );
  header.addText(
    'Center',
    { alignment: 'center' }
  );
  header.addText(
    'Page {{pageNumber}} of {{numberOfPages}}',
    { alignment: 'right' }
  );
});

report.addBody(function(body) {
  /***********************************************************/
  body.addTitle('Simple title');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('simple cell');
        row.addCell('simple cell');
      });
    });
  });

  /************************************************************/
  body.addTitle('Default table header');
  body.addTable(function(table) {
    table.addHeader(function(header) {
      header.addRow(function(row) {
        row.addCell('default header cell');
        row.addCell('default header cell');
        row.addCell('default header cell');
        row.addCell('default header cell');
      });
    });
  });

  /************************************************************/
  body.addTitle('Default table body');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
    });
  });

  /************************************************************/
  body.addTitle('Default table footer');
  body.addTable(function(table) {
    table.addFooter(function(footer) {
      footer.addRow(function(row) {
        row.addCell('default footer cell');
        row.addCell('default footer cell');
        row.addCell('default footer cell');
        row.addCell('default footer cell');
      });
    });
  });

  /************************************************************/
  body.addTitle('Default table with header');
  body.addTable(function(table) {
    table.addHeader(function(header) {
      header.addRow(function(row) {
        row.addCell('default header cell');
        row.addCell('default header cell');
        row.addCell('default header cell');
        row.addCell('default header cell');
      });
    });
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
    });
  });

  /************************************************************/
  body.addTitle('Default table with footer');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
    });
    table.addFooter(function(footer) {
      footer.addRow(function(row) {
        row.addCell('default footer cell');
        row.addCell('default footer cell');
        row.addCell('default footer cell');
        row.addCell('default footer cell');
      });
    });
  });

  /************************************************************/
  body.addTitle('Default table without body');
  body.addTable(function(table) {
    table.addHeader(function(header) {
      header.addRow(function(row) {
        row.addCell('default header cell');
        row.addCell('default header cell');
        row.addCell('default header cell');
        row.addCell('default header cell');
      });
    });
    table.addFooter(function(footer) {
      footer.addRow(function(row) {
        row.addCell('default footer cell');
        row.addCell('default footer cell');
        row.addCell('default footer cell');
        row.addCell('default footer cell');
      });
    });
  });

  /************************************************************/
  body.addTitle('Default table with header & footer');
  body.addTable(function(table) {
    table.addHeader(function(header) {
      header.addRow(function(row) {
        row.addCell('default header cell');
        row.addCell('default header cell');
        row.addCell('default header cell');
        row.addCell('default header cell');
      });
    });
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
    });
    table.addFooter(function(footer) {
      footer.addRow(function(row) {
        row.addCell('default footer cell');
        row.addCell('default footer cell');
        row.addCell('default footer cell');
        row.addCell('default footer cell');
      });
    });
  });

  /*************************************************************/
  body.addTitle('This table should spread two pages');
  body.addTable(function(table) {
    table.addHeader({ color: 'red' }, function(header) {
      header.addRow(function(row) {
        row.addCell('header at every page');
        row.addCell('header at every page');
        row.addCell('header at every page');
        row.addCell('header at every page');
      });
    });
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
    });
    table.addFooter({ color: 'green' }, function(footer) {
      footer.addRow(function(row) {
        row.addCell('footer only at the end');
        row.addCell('footer only at the end');
        row.addCell('footer only at the end');
        row.addCell('footer only at the end');
      });
    });
  });

  /************************************************************/
  body.addTitle('Font sizes');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default font size');
        row.addCell('12 px font size', {
          fontSize: 12
        });
        row.addCell('16 px font size', {
          fontSize: 14
        });
        row.addCell('20 px font size', {
          fontSize: 18
        });
      });
    });
  });

  /************************************************************/
  body.addTitle('Font colors');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default font color');
        row.addCell('blue font color', {
          color: 'blue'
        });
        row.addCell('gray font color', {
          color: 'gray'
        });
        row.addCell('#A52A2A (brown) font size', {
          color: '#A52A2A'
        });
      });
    });
  });

  /************************************************************/
  body.addTitle('Font styles');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default font style');
        row.addCell('bold font style', {
          fontStyle: 'bold'
        });
        row.addCell('italic font style', {
          fontStyle: 'italic'
        });
        row.addCell('bold & italic font style', {
          fontStyle: ['bold', 'italic']
        });
      });
    });
  });

  /************************************************************/
  body.addTitle('Font faces');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default font face');
        row.addCell('helvetica, standard font', {
          fontTypeFace: 'Helvetica'
        });
        row.addCell('Thabit, custom ttf font', {
          fontTypeFace: 'Thabit'
        });
        row.addCell('Chalkboard, custom ttc font', {
          fontTypeFace: 'Chalkboard'
        });
      });
    });
  });

  /************************************************************/
  var leftAlign = { alignment: 'left' };
  body.addTitle().addText('Left align title & table', leftAlign);
  body.addTable(leftAlign, function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
    });
  });

  /*************************************************************/
  var centerAlign = { alignment: 'center' };
  body.addTitle().addText('Center align title & table', centerAlign);
  body.addTable(centerAlign, function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
    });
  });

  /***********************************************************/
  var rightAlign = { alignment: 'right' };
  body.addTitle().addText('Right align title & table', rightAlign);
  body.addTable(rightAlign, function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
        row.addCell('default body cell');
      });
    });
  });

  /***********************************************************/
  body.addTitle().addText('Columns width (all fixed to 40)');
  var options = { columns: [{ width: 40 }, { width: 40 }, { width: 40 }] }
  body.addTable(options, function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('short content');
        row.addCell('this content just so long');
        row.addCell('longer content will wrap by default');
      });
    });
  });

  /***********************************************************/
  body.addTitle().addText('Columns width (first and third are fixed to 40, other are automatic)');
  var options = { columns: [{ width: 40 }, { width: undefined }, { width: 40 }] }
  body.addTable(options, function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('fixed width column, short content', { color: 'green' });
        row.addCell('automatic adjust column, this content just so long and', { color: 'orange' });
        row.addCell('fixed width column, longer content will wrap by default', { color: 'green' });
        row.addCell('automatic adjust column, longer content will wrap by default', { color: 'orange' });
      });
    });
  });

  /***********************************************************/
  body.addTitle().addText('Columns width (all automatic, scale to fit content)');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('nothing here', { color: 'orange' });
        row.addCell('tiny content dont need too much', { color: 'orange' });
        row.addCell('one more, please', { color: 'orange' });
        row.addCell('is it enough?', { color: 'orange' });
      });
    });
  });

  /***********************************************************/
  body.addTitle().addText('Columns width (all automatic, use all of the width)');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('nothing here', { color: 'orange' });
        row.addCell('tiny content dont need too much', { color: 'orange' });
        row.addCell('fat content want eat up most of the width, one more, please', { color: 'orange' });
        row.addCell('is it enough?', { color: 'orange' });
      });
    });
  });
});

report.addFooter(function(footer) {
  footer.addText(
    '{{documentAuthor}}'
  );
  footer.addText(
    'December 10th, 2014 - 14:05',
    { alignment: 'right' }
  );
});

co(function *() {
  yield report.generatePDFFile(nodePath.join(__dirname, 'test.pdf'));
  console.log('Document generated');
}).catch(function(err) {
  console.error(err.stack);
});

// setTimeout(function() {}, 1000000000);
