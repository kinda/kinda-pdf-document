'use strict';

let _ = require('lodash');
let KindaObject = require('kinda-object');

let Block = KindaObject.extend('Block', function() {
  Object.defineProperty(this, 'paddings', {
    get() {
      if (!this._paddings) this._paddings = {};
      return this._paddings;
    },
    set(paddings) {
      if (_.isNumber(paddings)) paddings = [paddings];
      if (_.isArray(paddings)) {
        let top = paddings[0];
        let right = paddings[1];
        let bottom = paddings[2];
        let left = paddings[3];
        if (right == null) right = top;
        if (bottom == null) bottom = top;
        if (left == null) left = right;
        paddings = { top, right, bottom, left };
      }
      this._paddings = paddings;
    }
  });

  Object.defineProperty(this, 'paddingLeft', {
    get() {
      return this.paddings.left;
    },
    set(paddingLeft) {
      this.paddings.left = paddingLeft;
    }
  });

  Object.defineProperty(this, 'paddingRight', {
    get() {
      return this.paddings.right;
    },
    set(paddingRight) {
      this.paddings.right = paddingRight;
    }
  });

  Object.defineProperty(this, 'paddingTop', {
    get() {
      return this.paddings.top;
    },
    set(paddingTop) {
      this.paddings.top = paddingTop;
    }
  });

  Object.defineProperty(this, 'paddingBottom', {
    get() {
      return this.paddings.bottom;
    },
    set(paddingBottom) {
      this.paddings.bottom = paddingBottom;
    }
  });

  let knownStyles = ['strong', 'small'];

  let parseText = function(text, isStyled) {
    // TODO: better implementation (should support nested tags)
    if (!isStyled) return [{ text }];
    let str, index1, index2, index3, style, closingTag;
    let segments = [];
    while (text.length) {
      index1 = text.indexOf('<');
      if (index1 === -1) {
        segments.push({ text });
        break;
      }
      index1++;
      index2 = text.indexOf('>', index1);
      if (index2 === -1) {
        str = text.substr(0, index1);
        text = text.substr(index1);
        segments.push({ text: str });
        continue;
      }
      style = text.slice(index1, index2);
      index2++;
      closingTag = '</' + style + '>';
      index3 = text.indexOf(closingTag, index2);
      if (!_.contains(knownStyles, style) || index3 === -1) {
        str = text.substr(0, index2);
        text = text.substr(index2);
        segments.push({ text: str });
        continue;
      }
      str = text.substr(0, index1 - 1);
      if (str) segments.push({ text: str });
      str = text.slice(index2, index3);
      text = text.substr(index3 + closingTag.length);
      segments.push({ text: str, style });
    }
    return segments;
  };

  let applyStyle = function(options, style) {
    options = _.cloneDeep(options);
    switch (style) {
      case 'strong':
        if (!_.contains(options.fontStyle, 'bold')) {
          options.fontStyle.push('bold');
        }
        break;
      case 'small':
        options.fontSize = options.fontSize * 0.66;
        break;
    }
    return options;
  };

  this.renderText = function(pdf, str, options) {
    let x = this.mmToPt(this.x + this.paddings.left);
    let y = this.mmToPt(this.y + this.paddings.top);
    let width = this.width - (this.paddings.left + this.paddings.right);
    this._renderText(pdf, str, x, y, width, options);
  };

  this._renderText = function(pdf, str, x, y, width, options) {
    let segments = parseText(str, options.isStyled);
    for (let i = 0; i < segments.length; i++) {
      let segment = segments[i];

      let segmentOptions = applyStyle(options, segment.style);
      let font = this.document.getFont(
        segmentOptions.fontTypeFace, segmentOptions.fontStyle
      );
      pdf.font(font.name, font.postScriptName);
      pdf.fontSize(segmentOptions.fontSize);
      pdf.fillColor(segmentOptions.color);

      let ascender = pdf._font.ascender / 1000; // TODO: clean this ugly code
      let normalAscender = ascender * options.fontSize;
      let segmentAscender = ascender * segmentOptions.fontSize;
      let offsetY = (normalAscender - segmentAscender);

      let opts = {};
      if (i < segments.length - 1) opts.continued = true;
      if (i === 0) {
        opts.width = this.mmToPt(width);
        opts.align = segmentOptions.alignment;
        pdf.text(segment.text, x, y + offsetY, opts);
      } else {
        pdf.y = pdf.y + offsetY;
        pdf.text(segment.text, opts);
      }
      pdf.y = pdf.y - offsetY; // FIXME: not sure what's happend in case of line break
    }
  };

  this.computeWidthOfString = function(str, options) {
    let width = 0;
    let segments = parseText(str, options.isStyled);
    for (let i = 0; i < segments.length; i++) {
      let segment = segments[i];
      let segmentOptions = applyStyle(options, segment.style);
      let font = this.document.getFont(
        segmentOptions.fontTypeFace, segmentOptions.fontStyle
      );
      this.document.pdf.font(font.name, font.postScriptName);
      this.document.pdf.fontSize(segmentOptions.fontSize);
      let w = this.document.pdf.widthOfString(segment.text);
      w = this.ptToMm(w);
      width += w;
    }
    width += this.paddings.left + this.paddings.right + 0.000001;
    return width;
  };

  this.computeHeightOfString = function(str, options) {
    let width = this.width - (this.paddings.left + this.paddings.right);
    this._renderText(this.document.draft, str, 0, 0, width, options);
    let height = this.document.draft.y;
    // remove last line gap
    height -= this.document.draft.currentLineHeight(true) - this.document.draft.currentLineHeight(false);
    height = this.ptToMm(height);
    height += this.paddings.top + this.paddings.bottom;
    return height;
  };

  this.mmToPt = function(mm) {
    let inch = mm / 25.4;
    let pt = inch * 72;
    return pt;
  };

  this.ptToMm = function(pt) {
    let inch = pt / 72;
    let mm = inch * 25.4;
    return mm;
  };
});

module.exports = Block;
