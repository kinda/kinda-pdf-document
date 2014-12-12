###KindaDocument###

  Main class exposed by require('kinda-document'). Have several methods

  ###create(options, fn)
  create an instance of KindaDocument.

  arguments:
  - `options` is an object have these properties
    - `width` page width in millimetre, default to `210`.
    - `height` page height in millimetre, default to `297`.
    - `paddings` padding between content and its container, default to `10`.
    - `fontTypeFace` font face, default to `Helvetica`.
    - `fontStyle` font style, can be `bold` and/or `italic`, default to `[]`.
    - `fontSize` font size, default to `10`.
    - `color` font color, default to black. can be specified in color name or hex.


  - `fn` is a call back function, will be called by the constructor. any passed arguments will be pass to constructor.


#### addHeader(options, fn)

  add a [DocumentHeader](document-header.md) to KindaDocument, can only be invoke once, Or it will throw a error.

  - `options` is an object have there properties for create a DocumentHeader.
  - `fn` is a call back function, will be called by the constructor. any passed arguments will be pass to constructor.


#### KindaDocument.getHeader()

  Get DocumentHeader instance from document.


#### KindaDocument.addBody(options, fn)

  add a DocumentBody to KindaDocument, can only be invoke once, Or it will throw a error.

  arguments:
  - `options` is an object have there properties for create a DocumentBody.
    - `alignment` content in body, default to `left`


- `fn` is a call back function, will be called by the constructor. any passed arguments will be pass to constructor.


#### KindaDocument.getBody()

  Get DocumentBody instance from document.


#### KindaDocument.addFooter(options, fn)

  add a DocumentFooter to KindaDocument, can only be invoke once, Or it will throw a error.

  arguments:

  - `options` is an object have there properties for create a DocumentBody.
    - `marginTop` between the DocumentFooter and DocumentBody, default to `5`.
    - `alignment` content in header, default to `left`


  - `fn` is a call back function, will be called by the constructor. any passed arguments will be pass to                   constructor.


#### KindaDocument.getFooter()

  Get DocumentFooter instance from document.


#### KindaDocument.registerFont(name, style, path, postScriptName)

  Register a Font

  arguments:

  - `name` font name.
  - `style` if passed, the value should be the subset of `['bold', 'italic']`.
  - `path` file path of font.
  - `postScriptName` font's PostScript Name, If the font is TrueType Collection, the name should be the font style.


  example:

  ```js
  document.registerFont('Thabit', ['bold', 'italic'],
    path.join(__dirname, 'fonts_folder', 'Thabit-BoldOblique.ttf')
  );

  document.registerFont('Chalkboard', ['bold'],
    path.join(__dirname, 'fonts_folder', 'Chalkboard.ttc'), 'Chalkboard-Bold'
  );
  ```

#### KindaDocument.generatePDFFile *(path)

  Generator function to output the pdf file

  argument:

  - `path` to output the generated PDF file
