# example.js

``` javascript
// CommonJs-style requires
var commonjs1 = require("./commonjs");
var amd1 = require("./amd");

// AMD-style requires (with all webpack features)
require([
	"./commonjs", "./amd",
	"../require.context/templates/"+amd1+".js",
	Math.random() < 0.5 ? "./commonjs" : "./amd"],
	function(commonjs2, amd2, template, randModule) {
		// Do something with it...
	}
);
```

# amd.js

``` javascript
// AMD Module Format
define(
	"app/amd",
	["./commonjs"],
	function(commonjs1) {
		// but you can use CommonJs-style requires:
		var commonjs2 = require("./commonjs");
		// Do something...
		return 456;
	}
);
```

# commonjs.js

``` javascript
// CommonJs Module Format
module.exports = 123;

// but you can use amd.style requires
require(
	["./amd"],
	function(amd1) {
		var amd2 = require("./amd");
	}
);
```


# js/output.js

``` javascript
/******/ (function webpackBootstrap(modules) {
/******/ 	var installedModules = {};
/******/ 	function require(moduleId) {
/******/ 		if(typeof moduleId !== "number") throw new Error("Cannot find module '"+moduleId+"'");
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		modules[moduleId].call(null, module, module.exports, require);
/******/ 		module.loaded = true;
/******/ 		return module.exports;
/******/ 	}
/******/ 	require.e = function requireEnsure(chunkId, callback) {
/******/ 		if(installedChunks[chunkId] === 1) return callback.call(null, require);
/******/ 		if(installedChunks[chunkId] !== undefined)
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		else {
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.src = modules.c+""+chunkId+".output.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/ 	require.modules = modules;
/******/ 	require.cache = installedModules;
/******/ 	var installedChunks = {0:1};
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkId, moreModules) {
/******/ 		for(var moduleId in moreModules)
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		var callbacks = installedChunks[chunkId];
/******/ 		installedChunks[chunkId] = 1;
/******/ 		for(var i = 0; i < callbacks.length; i++)
/******/ 			callbacks[i].call(null, require);
/******/ 	};
/******/ 	return require(0);
/******/ })({
/******/ c: "",

/***/ 0:
/*!********************!*\
  !*** ./example.js ***!
  \********************/
/***/ function(module, exports, require) {

	// CommonJs-style requires
	var commonjs1 = require(/*! ./commonjs */ 2);
	var amd1 = require(/*! ./amd */ 1);
	
	// AMD-style requires (with all webpack features)
	require.e/* require */(1, function(require) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		(require(/*! ./commonjs */ 2)), (require(/*! ./amd */ 1)),
		require(/*! ../require.context/templates */ 3)("./"+amd1+".js"),
		Math.random() < 0.5 ? (require(/*! ./commonjs */ 2)) : (require(/*! ./amd */ 1))]; (function(commonjs2, amd2, template, randModule) {
			// Do something with it...
		}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});

/***/ },

/***/ 1:
/*!****************!*\
  !*** ./amd.js ***!
  \****************/
/***/ function(module, exports, require) {

	// AMD Module Format
	{var __WEBPACK_AMD_DEFINE_ARRAY__ = [(require(/*! ./commonjs */ 2))]; var __WEBPACK_AMD_DEFINE_RESULT__ = (function(commonjs1) {
			// but you can use CommonJs-style requires:
			var commonjs2 = require(/*! ./commonjs */ 2);
			// Do something...
			return 456;
		}.apply(null, __WEBPACK_AMD_DEFINE_ARRAY__)); if(__WEBPACK_AMD_DEFINE_RESULT__ !== undefined) module.exports = __WEBPACK_AMD_DEFINE_RESULT__;};

/***/ },

/***/ 2:
/*!*********************!*\
  !*** ./commonjs.js ***!
  \*********************/
/***/ function(module, exports, require) {

	// CommonJs Module Format
	module.exports = 123;
	
	// but you can use amd.style requires
	require.e/* require */(0/* empty */, function(require) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [(require(/*! ./amd */ 1))]; (function(amd1) {
			var amd2 = require(/*! ./amd */ 1);
		}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});

/***/ }
/******/ })

```

# js/1.output.js

``` javascript
webpackJsonp(1, {

/***/ 3:
/*!************************************************!*\
  !*** ./require.context/templates ^\.\/.*\.js$ ***!
  \************************************************/
/***/ function(module, exports, require) {

	var map = {
		"./a.js": 4,
		"./b.js": 5,
		"./c.js": 6
	};
	module.exports = function webpackContext(req) {
		return require(map[req] || (function() { throw new Error("Cannot find module " + req + ".") }()));
	};
	module.exports.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	

/***/ },

/***/ 4:
/*!****************************************!*\
  !*** ./require.context/templates/a.js ***!
  \****************************************/
/***/ function(module, exports, require) {

	module.exports = function() {
		return "This text was generated by template A";
	}

/***/ },

/***/ 5:
/*!****************************************!*\
  !*** ./require.context/templates/b.js ***!
  \****************************************/
/***/ function(module, exports, require) {

	module.exports = function() {
		return "This text was generated by template B";
	}

/***/ },

/***/ 6:
/*!****************************************!*\
  !*** ./require.context/templates/c.js ***!
  \****************************************/
/***/ function(module, exports, require) {

	module.exports = function() {
		return "This text was generated by template C";
	}

/***/ }

})
```

# Info

## Uncompressed

```
Hash: 6d725ab24bc3aec4ef5415bed7020c11
Time: 37ms
      Asset  Size  Chunks  Chunk Names
  output.js  3621       0  main       
1.output.js  1403       1             
chunk    {0} output.js (main) 759
    [0] ./example.js 370 [built] {0}
    [1] ./amd.js 218 [built] {0}
        amd require ./amd [2] ./commonjs.js 5:0-10:1
        cjs require ./amd [2] ./commonjs.js 8:13-29
        cjs require ./amd [0] ./example.js 3:11-27
        amd require ./amd [0] ./example.js 6:0-13:1
        amd require ./amd [0] ./example.js 6:0-13:1
    [2] ./commonjs.js 171 [built] {0}
        cjs require ./commonjs [0] ./example.js 2:16-37
        amd require ./commonjs [0] ./example.js 6:0-13:1
        amd require ./commonjs [0] ./example.js 6:0-13:1
        amd require ./commonjs [1] ./amd.js 2:0-11:1
        cjs require ./commonjs [1] ./amd.js 7:18-39
chunk    {1} 1.output.js 439 {0} 
    [3] ./require.context/templates ^\.\/.*\.js$ 193 [built] {1}
        amd require context ../require.context/templates [0] ./example.js 6:0-13:1
    [4] ./require.context/templates/a.js 82 [built] {1}
        context element ./a.js [3] ./require.context/templates ^\.\/.*\.js$
    [5] ./require.context/templates/b.js 82 [built] {1}
        context element ./b.js [3] ./require.context/templates ^\.\/.*\.js$
    [6] ./require.context/templates/c.js 82 [built] {1}
        context element ./c.js [3] ./require.context/templates ^\.\/.*\.js$
```

## Graph

![webpack-graph](http://webpack.github.com/webpack/examples/mixed/graph.svg)
