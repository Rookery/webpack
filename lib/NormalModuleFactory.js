/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var async = require("async");

var Tapable = require("tapable");
var NormalModule = require("./NormalModule");
var LoadersList = require("webpack-core/lib/LoadersList");

function NormalModuleFactory(resolvers, parser, options) {
	Tapable.call(this);
	this.resolvers = resolvers;
	this.parser = parser;
	this.loaders = new LoadersList(options.loaders);
	this.preLoaders = new LoadersList(options.preLoaders);
	this.postLoaders = new LoadersList(options.postLoaders);
	this.context = options.context || "";
}
module.exports = NormalModuleFactory;

NormalModuleFactory.prototype = Object.create(Tapable.prototype);
NormalModuleFactory.prototype.create = function(context, dependency, callback) {
	context = context || this.context;
	var request = dependency.request;
	this.applyPluginsAsyncWaterfall("before-resolve", {
		context: context,
		request: request
	}, function(err, result) {
		if(err) return callback(err);

		context = result.context;
		request = result.request;

		var noAutoLoaders = /^!/.test(request);
		var noPrePostAutoLoaders = /^!!/.test(request);
		var elements = request.replace(/^!+/, "").replace(/!!+/g, "!").split("!");
		var resource = elements.pop();

		async.parallel([
			function(callback) {
				this.resolveRequestArray(context, elements, this.resolvers.loader, callback);
			}.bind(this),
			function(callback) {
				if(resource == "" || resource[0] == "?")
					return callback(null, resource);
				this.resolvers.normal.resolve(context, resource, callback);
			}.bind(this)
		], function(err, results) {
			if(err) return callback(err);
			var loaders = results[0];
			resource = results[1];
			var userRequest = loaders.concat([resource]).join("!");

			if(noPrePostAutoLoaders)
				return onDoneResolving.call(this);
			if(noAutoLoaders) {
				async.parallel([
					this.resolveRequestArray.bind(this, context, this.postLoaders.match(resource), this.resolvers.loader),
					this.resolveRequestArray.bind(this, context, this.preLoaders.match(resource), this.resolvers.loader)
				], function(err, results) {
					if(err) return callback(err);
					loaders = results[0].concat(loaders).concat(results[1]);
					onDoneResolving.call(this);
				}.bind(this));
			} else {
				async.parallel([
					this.resolveRequestArray.bind(this, context, this.postLoaders.match(resource), this.resolvers.loader),
					this.resolveRequestArray.bind(this, context, this.loaders.match(resource), this.resolvers.loader),
					this.resolveRequestArray.bind(this, context, this.preLoaders.match(resource), this.resolvers.loader)
				], function(err, results) {
					if(err) return callback(err);
					loaders = results[0].concat(results[1]).concat(loaders).concat(results[2]);
					onDoneResolving.call(this);
				}.bind(this));
			}
			function onDoneResolving() {
				this.applyPluginsAsyncWaterfall("after-resolve", {
					request: loaders.concat([resource]).join("!"),
					userRequest: userRequest,
					rawRequest: request,
					loaders: loaders,
					resource: resource,
					parser: this.parser
				},  function(err, result) {
					if(err) return callback(err);

					return callback(null,
						new NormalModule(
							result.request,
							result.userRequest,
							result.rawRequest,
							result.loaders,
							result.resource,
							result.parser
						)
					);
				}.bind(this));
			}
		}.bind(this));
	}.bind(this));
};

NormalModuleFactory.prototype.resolveRequestArray = function resolveRequestArray(context, array, resolver, callback) {
	if(array.length === 0) return callback(null, []);
	async.map(array, function(item, callback) {
		if(item == "" || item[0] == "?")
			return callback(null, item);
		resolver.resolve(context, item, callback);
	}, callback);
};
