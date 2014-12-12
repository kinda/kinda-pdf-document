# Component

Base class for all component.

## .creator(parent, options, fn)

### argument:

- `parent`: parent component
- `options`: config object, have these properties, Will inherit from parent component if not specifies.
  - `fontTypeFace`: font face
  - `fontStyle`: font style, subset of `['bold', 'italic']`
  - `color`: font color
  - `fontSize`: font size
  - `alignment`: text align
  - `margins`: margins
    - `top`:
    - `right`
    - `bottom`
    - `left`
  - `marginTop`: shortcut of `margin.top`
  - `marginRight`: shortcut of `margin.right`
  - `marginBottom`: shortcut of `margin.bottom`
  - `marginLeft`: shortcut of `margin.left`
  - `paddings`: paddings
    - `top`
    - `right`
    - `bottom`
    - `left`
  - `paddingTop`: shortcut of `padding.top`
  - `paddingRight`: shortcut of `padding.right`
  - `paddingBottom`: shortcut of `padding.bottom`
  - `paddingLeft`: shortcut of `padding.left`
- `fn`
