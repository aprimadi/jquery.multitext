jquery.multitext
================

Convert a text field into multi text

### Dependency

- jQuery
- Bootstrap version 2.x.x

### Usage

Let's say you have an input:

```
<input type="text" name="alphabet[]" value="" class="multitext" data-value="[a, b, c]" />
```

Call

```
$('.multitext').multitext()
```

To convert the text input into multiple text input