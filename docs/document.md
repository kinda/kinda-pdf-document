# Document

Main class exposed by require('kinda-pdf-document'). But you can not use it with the `new` operator, Call `KindaPDFDocument.create(options)` to create an instance.

### example:
```js
var KindaPDFDocument = require('kinda-pdf-document');

var options = {
  width: 210,
  height: 297,
  paddings: 10,
  fontTypeFace: 'Helvetica',
  fontStyle: ['bold'],
  fontSize: 12,
  color: 'brown',
  title: 'This is my first PDF file',
  author: 'Red Beard <red@beard.com>',
  subject: 'How to become a pirate?',
  keywords: 'ship, gold, wreck'
};

var doc = KindaPDFDocument.create(options);
```
The parameter `options` is an object with properties listed below:

  - `width`, a number to set the PDF page width in millimeter, defaults to `210`mm.

  #### example:
  ```js
  var options = {
      width: 210
  };
  ```
  - `height`, a number to set the PDF page height in millimeter, defaults to `297`mm.

  #### example:
  ```js
  var options = {
      height: 297
  }
  ```
  - `paddingTop`, a number specify the distance between the component and its content on top side in millimeter, defaults to `10`mm.
  - `paddingRight`, padding on the right side, defaults to `10`mm.
  - `paddingBottom`, padding on the bottom side, defaults to `10`mm.
  - `paddingLeft`, padding on the left side, defaults to `10`mm.
  - `paddings`, an object define all four padding properties on each side, It is a combination of `paddingTop` `paddingRight` `paddingBottom` and `paddingLeft`. It has four properties:
    - `top`, top side.
    - `right`, right side.
    - `bottom`, bottom side.
    - `left`, left side.

  You can set up paddings in these formats:

  #### example:
  ```js
  // specify one by one
  var options = {
      paddingTop: 5,
      paddingRight: 10,
      paddingBottom: 5,
      paddingLeft: 10
  };

  // or pass an object to it
  var options = {
    paddings: {
      top: 5,
      right: 10,
      bottom: 5,
      left: 10
    }
  };

  // this expression is true, the other three properties is the same
  paddings.top == paddingTop; //true

  // or you can pass an array. List each padding in [top, right, bottom, left] sequence.
  var options = {
      paddings: [5, 10, 5, 10]
  };

  // if the padding of each side is the same, You can simple specify it by pass a single number
  var options = {
      paddings: 5
  };
  ```
  - `marginTop`,  a number specify the distance between the component and its container on top side in millimeter, defaults to `0`mm.
  - `marginRight`, margin on the right side, defaults to `0`mm.
  - `marginBottom`, margin on the bottom side, defaults to `0`mm.
  - `marginLeft`, margin on the left side, defaults to `0`mm.
  - `margins`, like the paddings property, We have a property define all the four margins on each side. It has four properties:  
    - `top`, top side, equals to `marginTop`.
    - `right`, right side, equals to `marginRight`.
    - `bottom`, bottom side, equals to `marginBottom`.
    - `left`, left side, equals to `marginLeft`.

  The usage of `margins` property is the same like `paddings`.
  - `fontTypeFace`, a string specify the default font face for all the texts in the document, You can use [Standard 14 Fonts](http://en.wikipedia.org/wiki/Portable_Document_Format#Standard_Type_1_Fonts_.28Standard_14_Fonts.29) listed below.
    - `Times`, with `regular`, `italic`, `bold`, and `bold italic` styles.
    - `Courier`, with `regular`, `oblique`, `bold` and `bold oblique` styles.
    - `Helvetica`, with `regular`, `oblique`, `bold` and `bold oblique` styles.
    - `Symbol`.
    - `Zapf Dingbats`.

    Or register your own font(we will show you how to do it [below](#registerfont)). The default value is `Helvetica`.
  - `fontStyle`, font style, subset of `['bold', 'italic']`(we treat `italic` and `oblique` as the same thing, though they have some differences, check the link [here](http://en.wikipedia.org/wiki/Oblique_type)). If you only need one style, You can only pass the style string. Its default value is `[]`, means the regular font style.

  #### example:
  ```js
  // use any combinations of 'bold' and 'italic'
  var optons = {
      fontStyle: ['bold', 'italic'] // use both 'bold' and 'italic'
  };

  // only 'bold'
  var options = {
      fontStyle: ['bold']
  };

  // regular style
  var options = {
      fontStyle: []
  };

  // or if we only need one style, We can directly pass it
  var options = {
      fontStyle: 'bold' // it is the same with ['bold']
  }

  // we treat 'oblique' as 'italic'.
  // For Helvetica font, It has an 'oblique' style, but we still use 'italic'
  var options = {
      fontTypeFace: 'Helvetica',
      fontStyle: ['italic']
  };
  ```
  - `fontSize`, font size in point, default to `10`pt.

  #### example:
  ```js
  var options = {
      fontSize: 10
  };
  ```
  - `color`, font color, default to `black`. You can set the value in two formats: hex or color name. [Here](https://github.com/devongovett/pdfkit/blob/master/lib/mixins/color.coffee#L127) you can find the availble color name, And [this list](http://www.w3.org/TR/css3-color/#svg-color) is for your eyes.

  #### example:
  ```js
  var options = {
      color: '#A52A2A' // hex
  };

  var options = {
      color: 'brown' // the name of '#A52A2A'
  };
  ```
  - `title`, a string to specify the title of the document.

  #### example:
  ```js
  var options = {
      title: 'KindaPDFDocument tests'
  };
  ```
  - `author`, a string to specify set the name of the author.
  - `subject`, a string to specify set the subject of the document.
  - `keywords`, a string to specify set keywords associated with the document, Usually, each keyword separate by comma.

  #### example:
  ```js
  var options = {
      keywords: 'Document, generator, PDFKit, Node.js'
  };
  ```

The last four properties (`title`, `author`, `subject`, `keywords`) are the meta datas of PDF file, Here is a [link](http://en.wikipedia.org/wiki/Portable_Document_Format#Metadata) that will tell you what it is.

## doc.addHeader(options, fn)

Add a [DocumentHeader](document-header.md) to `doc`, But only can be invoke once, or it will throw an error.

### arguments:
- `options`, object has these properties:
  - `fontStyleFace`, property inherite from parent component, default to the same value of parent component.
  - `fontStyle`, property inherite from parent component, default to the same value of parent component.
  - `fontSize`, property inherite from parent component, default to the same value of parent component.
  - `color`, property inherite from parent component, default to the same value of parent component.
  - `paddings`, property inherite from parent, But the default value is **not inherite** from parent component. The value defaults to `0`mm for each side.
  - `margins`, likes the `paddings` property, It is inherite from parent component, And the value defaults to `[0 , 0, 5, 0]` which means `marginBottom` is `5`mm.
  - `alignment`, property inherit from parent component, It defines the header's position(not the content in header) relate to the parent component. And the value defaults to `left`.
- `fn`, is a function taking one argument.
  - `header`, a new instance of [DocumentHeader](document-header.md). You can manipulate it in the function body.

### example:
```js
var headerOptions = {
  marginTop: 5,
  alignment: 'left'
};
doc.addHeader(headerOptions, function(header) {
  header.addRow(...);
});
```

## doc.addBody(options, fn)

Add a [DocumentBody](document-body.md) to `doc`, But only can be invoke once, or it will throw an error.

### arguments:
These two properties acts almost the same like the arguments in the addHeader function.
- `options`, an object. But pay attention with the margins. The default margins value is `[0, 0, 0, 0]`.
- `fn`, a function has an argument named `body`.

## doc.addFooter(options, fn)

Add a [DocumentFooter](document-footer.md) to `doc`, But only can be invoke once, or it will throw an error.

### arguments:
These two properties acts almost the same like the arguments in the addHeader function.
- `options`, an object. The default margins value is `[5, 0, 0, 0]` which means `marginTop` is `5`mm.
- `fn`, a function has an argument named `footer`.

## doc.registerFont(name, style, path, postScriptName)

Register a custom font for further use.

### arguments:
- `name`, font name without style suffix.
- `style`, if passed, the value should be the subset of `['bold', 'italic']`. Remenber that we treat `oblique` as `italic`.
- `path`, file path of font file.
- `postScriptName`, if the font path directs to a ttf([TrueType Font](http://en.wikipedia.org/wiki/TrueType)) font, It is the font name with style suffix, And it is not necessary in this situation. But if the font path directs to a ttc([TrueType Collections](http://en.wikipedia.org/wiki/TrueType#TrueType_Collection)) font collection. The value is one of the font name in a ttc font collections and it is required.

### example:
```js
// define a ttf font and use it
var font1 = path.join(__dirname, 'fonts_folder', 'Thabit-BoldOblique.ttf');
doc.registerFont('Thabit', ['bold', 'italic'], font1);
var options1 = {
  fontTypeFace: 'Thabit',
  fontStyle: ['bold', 'italic']
};

// define a ttc font and use it
var font2 = path.join(__dirname, 'fonts_folder', 'Chalkboard.ttc');
doc.registerFont('Chalkboard', ['bold'], font2, 'Chalkboard-Bold' );
var options2 = {
  fontTypeFace: 'Chalkboard',
  fontStyle: ['bold']
}
```

## doc.generatePDFFile *(path)

Function to output the PDF file to the specified path. It is a generator in ES6, So you need to use it with `yield` keyword.

### argument:
- `path`, a file path to where save the generated file.

### example:
```js
// use it with yield
yield doc.generatePDFFile('path/to/dest.pdf');
```
