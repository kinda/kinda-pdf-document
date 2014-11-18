"use strict";

var misc = {
  mmToPt: function(mm) {
    return mm * 0.0393701 * 72;
  },

  ptToMm: function(pt) {
    return pt / (0.0393701 * 72);
  }
};

module.exports = misc;
