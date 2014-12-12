## DocumentBody
#### Class of page body

### components
property, list of child components



### creator(options, fn)
function to create an instance of self

** arguments: **
> - `options` is an object have there properties for create a DocumentBody.
>  - `marginBottom` between the DocumentBody and DocumentBody, default to `5`.
>  - `alignment` content in header, default to `left`


> - `fn` is a call back function, will be called by the constructor. any passed arguments will be pass to constructor.


### addText(value, options)
function extend from [Box](box.md)

** argument: **

- `value` text string add in the header
- `options` object for custom the text


### addTitle(value, options, fn)
method to add title(and text) in document body and return it.

** arguments: **

- `value` *optional*, If passed, will add a text to in a title, `addTitle(value)` equals to `addTitle().addText(value)`.
- `options` *optional*, object for customize
- `fn` *optional*, function will be called when init


### addTable(options, fn)
function to initial an Table and add it in document body then return it self.

** arguments: **
- `options` *optional*, object to config the table
- `fn` *optional*, function will be called when initial
