'use strict';

let Component = require('./');

let Text = Component.extend('Text', function() {
  let superCreator = this.creator;
  this.creator = function(parent, value, options, fn) {
    if (value == null) throw new Error('undefined value');
    value = String(value);
    superCreator.call(this, parent, options, fn);
    this.value = value;
  };

  this.render = function(block) {
    let height = this.computeHeight(block);
    if (height > block.height) block.height = height;

    block.document.draw(pdf => {
      let str = this.parseVariables(this.value, block);
      let options = {
        fontTypeFace: this.fontTypeFace,
        fontStyle: this.fontStyle,
        fontSize: this.fontSize,
        color: this.color,
        lineGap: this.lineGap,
        alignment: this.alignment,
        isStyled: this.isStyled
      };
      block.renderText(pdf, str, options);
    });
  };

  this.parseVariables = function(str, block) {
    let variables = [
      {
        placeholder: '{{documentTitle}}',
        replacement() {
          return block.document.title;
        }
      },
      {
        placeholder: '{{documentAuthor}}',
        replacement() {
          return block.document.author;
        }
      },
      {
        placeholder: '{{documentSubject}}',
        replacement() {
          return block.document.subject;
        }
      },
      {
        placeholder: '{{documentKeywords}}',
        replacement() {
          return block.document.keywords;
        }
      },
      {
        placeholder: '{{pageNumber}}',
        replacement() {
          return block.document.pageNumber;
        }
      },
      {
        placeholder: '{{numberOfPages}}',
        replacement() {
          return block.document.numberOfPages;
        }
      }
    ];

    variables.forEach(function(variable) {
      str = str.replace(variable.placeholder, variable.replacement);
    });

    return str;
  };

  this.computeWidth = function(block) {
    let str = this.parseVariables(this.value, block);
    let options = {
      fontTypeFace: this.fontTypeFace,
      fontStyle: this.fontStyle,
      fontSize: this.fontSize,
      lineGap: this.lineGap,
      isStyled: this.isStyled
    };
    return block.computeWidthOfString(str, options);
  };

  this.computeHeight = function(block) {
    let str = this.parseVariables(this.value, block);
    let options = {
      fontTypeFace: this.fontTypeFace,
      fontStyle: this.fontStyle,
      fontSize: this.fontSize,
      lineGap: this.lineGap,
      isStyled: this.isStyled
    };
    return block.computeHeightOfString(str, options);
  };
});

module.exports.Text = Text;
