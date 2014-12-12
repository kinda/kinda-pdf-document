# DocumentBody

Class of document body, extend from [Component](component.md)

## .components
list of child components

## .addTitle(value, options, fn)
method to add a [Title](title.md)(and text) in document body and return it.

### arguments:

- `value`: *optional*, If passed, will add a text to in a title, `addTitle(value)` equals to `addTitle().addText(value)`.
- `options`: *optional*, object for customize
- `fn`: *optional*, function will be called when init


## .addTable(options, fn)
function to initial an Table and add it in document body then return it self.

### arguments:
- `options`: *optional*, object to config the table
- `fn`: *optional*, function will be called when initial
