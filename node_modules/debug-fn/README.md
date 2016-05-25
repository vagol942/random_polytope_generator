# debug-fn
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Wraps visionmedia/debug to execute a function on demand based on the DEBUG env
variable

## Install

```sh
npm install --save-dev debug-fn
```

## Usage

A logger is created in the same way as [debug](https://www.npmjs.com/package/debug), 
the difference is that the logger receives a function instead of multiple arguments, 
the function will be called based on [debug](https://www.npmjs.com/package/debug) rules 
(which checks the value of the DEBUG env variable)

```js
// file example.js
import debugFn from 'debug-fn'

const logger = debugFn('app')

logger(function (log) {
  log('hello')
})
```

Running `example.js` with the DEBUG env set to `app`

```sh
$ DEBUG=app node example.js
  app hello! +0ms
```

Running `example.js` without the DEBUG env doesn't log anything

```sh
$ node example.js
```

NOTE: you could also use `this.log` inside logger's function argument (which is
the same as the `log` argument)

```js
// file example.js
import debugFn from 'debug-fn'

const logger = debugFn('app')

logger(function () {
  this.log('hello')
})
```

If you want to overwrite debug's custom logger, the logger instance is stored in
`logger.logger` e.g.

```js
// logger.logger is the result of calling `debug('app')`
logger.logger.log = function () {
  // custom logic to handle the output
}
```

### Why?

Imagine you have a cpu expensive operation that you only want to be executed when
DEBUG is set, [debug](https://www.npmjs.com/package/debug) can't do that out of
the box, this wrapper allows you to do that by wrapping your cpu expensive
operation in a function

## License

MIT © [Mauricio Poppe](http://maurizzzio.com)

[npm-url]: https://npmjs.org/package/debug-fn
[npm-image]: https://img.shields.io/npm/v/debug-fn.svg?style=flat

[travis-url]: https://travis-ci.org/maurizzzio/debug-fn
[travis-image]: https://img.shields.io/travis/maurizzzio/debug-fn.svg?style=flat

[codecov-url]: https://codecov.io/github/maurizzzio/debug-fn
[codecov-image]: https://img.shields.io/codecov/c/github/maurizzzio/debug-fn.svg?style=flat

[depstat-url]: https://david-dm.org/maurizzzio/debug-fn
[depstat-image]: https://david-dm.org/maurizzzio/debug-fn.svg?style=flat
[download-badge]: http://img.shields.io/npm/dm/debug-fn.svg?style=flat

