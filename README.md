[![webpack](http://webpack.github.com/assets/logo.png)](http://webpack.github.com)

[documentation](https://github.com/webpack/docs/wiki)

# Introduction

webpack is a bundler for modules. The main purpose is to bundle javascript files for useage in browser.

**TL;DR**

* bundles CommonJs and/or AMD modules. (even combined)
* can create a single bundle or a bunch of chunks loaded on demand, to reduce initial loading time.
* dependencies are resolved while compiling, this makes the runtime very small
* loader can preprocess files while compiling, i. e. coffee-script to javascript

Check the [documentation](https://github.com/webpack/docs/wiki) if you want to know more...

# Examples

Take a look at the `examples` folder.

# Features

* loaders are chainable
* loaders run in node.js and can do a bunch of stuff
* option to name your file with a hash of the content
* watch mode
* plugin system, extend webpack or build a complete different compiler
* interfaces
 * CLI with arguments
 * CLI with config file, arguments still possible
 * usable as library from node.js
 * usable as grunt plugin
* browser replacements
 * comes with browser replacements for some node.js modules
* see also
 * [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
 * [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
 * [enhanced-resolve](https://github.com/webpack/enhanced-resolve) and
 * [enhanced-require](https://github.com/webpack/enhanced-require)

## A small example what's possible

``` javascript
var commonjs = require("./commonjs");
define(["amd-module", "./file"], function(amdModule, file) {
	require(["big-module/big/file"], function(big) {
		// AMD require acts as split point
		// and "big-module/big/file" is only downloaded when requested
		var stuff = require("../my/stuff");
		// dependencies automatically goes in chunk too
	});
});

require("coffee!./cup.coffee");
// The loader syntax allows to proprocess files
// for common stuff you can bind RegExps to loaders
// if you also add ".coffee" to the default extensions
// you can write:
require("./cup");

function loadTemplate(name) {
	return require("./templates/" + name ".jade");
	// dynamic requires are supported
	// while compiling we figure out what can be requested
	// here everything in "./templates" that matches /^.*\.jade$/
	// (can also be in subdirectories)
}

require("imports?_=underscore!../loaders/my-ejs-loader!./template.html");
// you can chain loaders
// you can configure loaders with query parameters
// and loaders resolve similar to modules

// ...you can combine everything
function loadTemplateAsync(name, callback) {
	require(["bundle?lazy!./templates/" + name + ".jade"], function(templateBundle) {
		templateBundle(callback);
	});
}
```



## Tests

You can run the unit tests with `npm test`. [![build status](https://secure.travis-ci.org/webpack/webpack.png)](http://travis-ci.org/webpack/webpack)

You can run the browser tests:

```
cd test/browsertests
node build
```

and open `tests.html` in browser.



## Contribution

You are welcome to contribute by writing issues or pull requests.
It would be nice if you open source your own loaders or webmodules. :)

You are also welcome to correct any spelling mistakes or any language issues, because my english is not perfect...




## License

Copyright (c) 2012-2013 Tobias Koppers

MIT (http://www.opensource.org/licenses/mit-license.php)




## Dependencies

* [esprima](http://esprima.org/)
* [enhanced-resolve](https://github.com/webpack/enhanced-resolve)
* [uglify-js](https://github.com/mishoo/UglifyJS)
* [mocha](https://github.com/visionmedia/mocha)
* [should](https://github.com/visionmedia/should.js)
* [optimist](https://github.com/substack/node-optimist)
* [async](https://github.com/caolan/async)
* [mkdirp](http://esprima.org/)
* [clone](https://github.com/pvorb/node-clone)