report
  header
    text

report.render = function(document) {
  report.children.forEach(function(child) {
    child.render(document);
  });
};

header.render = function(document) {
  var maxHeight = 0;
  report.children.forEach(function(child) {
    var height = child.render(document);
    if (height > maxHeight) maxHeight = height;
  });

};

text.render = function(document, width) {
  document.pdf.renderText(this.value, document.x, document.y, width);
  var height = document.pdf.getTextHeight(this.value, width);
  return height;
};

getTextHeight(str, width) // => height
