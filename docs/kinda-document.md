# KindaDocument

Main class exposed by require('kinda-document'). Extend from [Component](component.md).

## .addHeader(options, fn)

add a [DocumentHeader](document-header.md) to KindaDocument, can only be invoke once, Or it will throw a error.

### arguments:

- `options`: is an object have there properties for create a DocumentHeader.
- `fn`: is a call back function, will be called by the constructor. any passed arguments will be pass to constructor.


## .getHeader()

Get DocumentHeader instance from document.

## .addBody(options, fn)

add a DocumentBody to KindaDocument, can only be invoke once, Or it will throw a error.

### arguments:

- `options` is an object have there properties for create a DocumentBody.
  - `alignment` content in body, default to `left`


- `fn` is a call back function, will be called by the constructor. any passed arguments will be pass to constructor.

## .getBody()

Get DocumentBody instance from document.

## .addFooter(options, fn)

add a DocumentFooter to KindaDocument, can only be invoke once, Or it will throw a error.

### arguments:

- `options` is an object have there properties for create a DocumentBody.
  - `marginTop` between the DocumentFooter and DocumentBody, default to `5`.
  - `alignment` content in header, default to `left`


- `fn` is a call back function, will be called by the constructor. any passed arguments will be pass to                   constructor.

## .getFooter()

Get DocumentFooter instance from document.

## .registerFont(name, style, path, postScriptName)

Register a Font

### arguments:

- `name` font name.
- `style` if passed, the value should be the subset of `['bold', 'italic']`.
- `path` file path of font.
- `postScriptName` font's PostScript Name, If the font is TrueType Collection, the name should be the font style.


### example:

```js
document.registerFont('Thabit', ['bold', 'italic'],
  path.join(__dirname, 'fonts_folder', 'Thabit-BoldOblique.ttf')
);

document.registerFont('Chalkboard', ['bold'],
  path.join(__dirname, 'fonts_folder', 'Chalkboard.ttc'), 'Chalkboard-Bold'
);
```

## KindaDocument.generatePDFFile *(path)

Static generator function to output the pdf file

### argument:

- `path` to output the generated PDF file
