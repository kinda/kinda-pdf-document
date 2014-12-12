## DocumentHeader

  Class of page header


###creator(options, fn)

arguments:

- `options` is an object have there properties for create a DocumentBody.
  - `marginBottom` between the DocumentBody and DocumentBody, default to `5`.
  - `alignment` content in header, default to `left`


- `fn` is a call back function, will be called by the constructor. any passed arguments will be pass to constructor.


###addText(value, options)

method extend from [Box](box.md)

argument:

- `value` text string add in the header
- `options` object for custom the text
