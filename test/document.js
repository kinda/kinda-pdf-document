var nodePath = require('path');
var _ = require('lodash');
var co = require('co');
var Document = require('../');
var Table = require('../component/table');

var options = {
  title: 'Kinda Document tests',
  author: 'fishead <zhchuan7@gmail.com>',
  subject: 'Kinda Document tests',
  keywords: 'Visitor PDFKit Node.js',
}
var report = Document.create(options);

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
    '{{reportTitle}}'
  );
  header.addText(
    '5 chekings',
    { alignment: 'center' }
  );
  header.addText(
    'Page {{pageNumber}} of {{numberOfPages}}',
    { alignment: 'right' }
  );
});

report.addBody(function(body) {
  /***********************************************************/
  body.addTitle('title adds with shortcut');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('cell adds with shortcut');
        row.addCell('cell adds with shortcut');
      });
    });
  });

  /************************************************************/
  body.addTitle('default table header');
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
  body.addTitle('default table body');
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
  body.addTitle('default table footer');
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
  body.addTitle('default table with header');
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
  body.addTitle('default table with footer');
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
  body.addTitle('default table without body');
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
  body.addTitle('default table with header & footer');
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
  body.addTitle('Table spread two page');
  body.addTable(function(table) {
    table.addHeader(function(header) {
      header.addRow(function(row) {
        row.addCell('header at every page', { color: 'red' });
        row.addCell('header at every page', { color: 'red' });
        row.addCell('header at every page', { color: 'red' });
        row.addCell('header at every page', { color: 'red' });
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

    table.addFooter(function(footer) {
      footer.addRow(function(row) {
        row.addCell('footer only at the end', { color: 'green' });
        row.addCell('footer only at the end', { color: 'green' });
        row.addCell('footer only at the end', { color: 'green' });
        row.addCell('footer only at the end', { color: 'green' });
      });
    });
  });

  /************************************************************/
  body.addTitle('font size');
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
  body.addTitle('font color');
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
  body.addTitle('font style');
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
  body.addTitle('font face');
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
  body.addTitle().addText('left align title & Table', leftAlign);
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
  body.addTitle().addText('center align title & Table', centerAlign);
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
  body.addTitle().addText('right align title & Table', rightAlign);
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
  body.addTitle().addText('columns width (all fixed to 40)');
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
  body.addTitle().addText('columns width (half fixed to 40, half is automatic)');
  var options = { columns: [{ width: 40 }, { width: undefined }, { width: 40 }] }
  body.addTable(options, function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('fixed width column, short content', { color: 'green' });
        row.addCell('automatic adjust column, this content just so long and', { color: 'cyan' });
        row.addCell('fixed width column, longer content will wrap by default', { color: 'green' });
        row.addCell('automatic adjust column, longer content will wrap by default', { color: 'cyan' });
      });
    });
  });

  /***********************************************************/
  body.addTitle().addText('columns width (all automatic, scale to fit content)');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('nothing here', { color: 'cyan' });
        row.addCell('tiny content dont need too much', { color: 'cyan' });
        row.addCell('one more, please', { color: 'cyan' });
        row.addCell('is it enough?', { color: 'cyan' });
      });
    });
  });

  /***********************************************************/
  body.addTitle().addText('columns width (all automatic, use all of the width)');
  body.addTable(function(table) {
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell('nothing here', { color: 'cyan' });
        row.addCell('tiny content dont need too much', { color: 'cyan' });
        row.addCell('fat content want eat up most of the width, one more, please', { color: 'cyan' });
        row.addCell('is it enough?', { color: 'cyan' });
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
  console.log('Document generated');
}).catch(function(err) {
  console.error(err.stack);
});

setTimeout(function() {}, 1000000000);
