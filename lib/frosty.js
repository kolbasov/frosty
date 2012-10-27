/**
* The server brain.
*/

/**
* List of loaded modules.
*/
exports.modules = [];

exports.setup = function(app) {
	loadModules();
	var modules = exports.modules;
	for(var i = 0; i < modules.length; i++) {
		initModule(app, modules[i]);
	}
}

/**
* Initialize a module.
*/
function initModule(app, module) {
	for(var method in module) {
		if(method == 'setup')
			module[method].apply(module, [app]);
		else
			app.all('/' + module.name + '/' + method, handle(module[method]));
	}
}

/**
* Load modules from modules.json.
*/
function loadModules() {
	var list = require('./modules');
	for(var i = 0; i < list.length; i++) {
		loadModule(list[i]);
	}
}

/**
* Load the spicified module.
*/
function loadModule(name) {
	var module = require('./' + name);
	module.name = name;
	exports.modules.push(module);
}

/**
* Process HTTP request.
*/
function processRequest(res, data, err) {
	var body, contentLength;
	if(err) throw err;
	if(data) {
		body = JSON.stringify(data);
		contentLength = Buffer.byteLength(body.toString(), 'utf8').toString();
	  res.writeHead(200, {
			'Content-Type': 'application/json',
			'Content-Length': contentLength,
			'Access-Control-Allow-Origin': '*'
		});
		return res.end(body);
	}
	return res.end();
}

/**
* Handle the result from a module.
*/
function handle(fn) {
	return function(req, res) {
		fn(req, res, processRequest);
	}
}