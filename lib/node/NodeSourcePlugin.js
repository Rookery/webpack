/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var path = require("path");
var ModuleAliasPlugin = require("enhanced-resolve/lib/ModuleAliasPlugin");

function NodeSourcePlugin() {
}
module.exports = NodeSourcePlugin;
NodeSourcePlugin.prototype.apply = function(compiler) {
	function addParsedVariable(name, expression) {
		if(!this.state.current.addVariable) return false;
		var deps = [];
		this.parse(expression, {current: {
			addDependency: function(dep) {
				dep.userRequest = name;
				deps.push(dep);
			}
		}});
		this.state.current.addVariable(name, expression, deps);
		return true;
	}
	function ignore() { return true; }
	compiler.parser.plugin("expression process", function(expr) {
		return addParsedVariable.call(this, "process", "require(" + JSON.stringify(path.join(__dirname, "..", "..", "buildin", "process.js")) + ")");
	});
	compiler.parser.plugin("expression global", function(expr) {
		return this.state.current.addVariable("global", "this");
	});
	compiler.parser.plugin("expression __filename", function(expr) {
		return this.state.current.addVariable("__filename", "window.location.pathname");
	});
	compiler.parser.plugin("expression __dirname", function(expr) {
		return this.state.current.addVariable("__dirname", "window.location.origin");
	});
	compiler.parser.plugin("expression module.exports", ignore);
	compiler.parser.plugin("expression module.loaded", ignore);
	compiler.parser.plugin("expression module.id", ignore);
	compiler.parser.plugin("expression module", function(expr) {
		return addParsedVariable.call(this, "module", "require(" + JSON.stringify(path.join(__dirname, "..", "..", "buildin", "module.js")) + ")(module)");
	});
	compiler.resolvers.normal.apply(
		new ModuleAliasPlugin((function() {
			return [
				"assert",
				"buffer",
				"child_process",
				"events",
				"path",
				"punycode",
				"querystring",
				"url",
				"util"
			].reduce(function(o, v) {
				o[v] = path.join(__dirname, "..", "..", "buildin", "web_modules", v + ".js")
				return o;
			}, {});
		}()))
	);
};