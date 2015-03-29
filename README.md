# replace-require

Replace require statements.

Heavily inspired by [transform-deps](https://github.com/tetsuo/transform-deps), but allows replacement of the whole require statement.

## Install

```sh
npm install --save replace-require
```

## Use

```js
var rpl = require('replace-require')
var src = rpl("require('foo');require('bar')", function(target) {
    if (target.indexOf('foo') >= 0) return "require('baz')" 
})
console.log(src)
// => require('baz');require('bar')
```

## Changelog

### 1.1.0

* Updated acorn

### 1.0.0

* Initial release :tada:

enjoy
