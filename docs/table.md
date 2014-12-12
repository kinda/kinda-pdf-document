# Table

Class extend from [Component](component.md). Use it with [DocumentBody.addTable()](document-body.md#addTable), don't directly use it.

## .columns

A list that define each column in the table.

## .borderWidth

A number define cell border width.

## .borderColor

Cell border color, can be specified with color name (`red`) or hex format (`#FF0000`).

## .addHeader(options, fn)

Add a [TableHeader](table-header.md) instance to the table if the table don't have one. Will throw an error if invoke this method more than once.

- `options`
- `fn`

## .getHeader()

Return a [TableHeader](table-header.md) instance if the table has one.

## .addBody(options, fn)

Add a [TableBody](table-body.md) instance to the table if the table don't have one. Will throw an error if invoke this method more than once.

- `options`
- `fn`

## .getBody()

Return a [TableBody](table-body.md) instance if the table has one.

## .addFooter(options, fn)

Add a [TableFooter](table-footer.md) instance to the table if the table don't have one. Will throw an error if invoke this method more than once.

- `options`
- `fn`

## .getFooter()

Return a [TableFooter](table-footer.md) instance if the table has one.
