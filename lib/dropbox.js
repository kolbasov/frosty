/**
* Dropbox module.
*/
var dbox = require('dbox')
	,	profile = require('./profile')
	,	dropbox = dbox.app({
			'app_key': process.env.DROPBOX_APP_KEY,
			'app_secret': process.env.DROPBOX_APP_SECRET
		})
	, oauth_callback = 'http://localhost:8080/auth/dropbox/callback/'
	, fs = require('fs');

exports.setup = function(app) {
	app.all('/dropbox/*', authenticate);

	app.use('/auth/dropbox/callback', function(req, res) {
		var request_token = req.session.dropbox.request_token;
		if(request_token) {
			dropbox.accesstoken(request_token, function(status, access_token) {
				delete req.session.dropbox.request_token;
				req.session.dropbox.access_token = access_token;
				profile.setDropboxAccessToken(req.session.user, access_token);
				res.redirect('/');
			});
		}
	});

	app.use('/auth/dropbox', function(req, res) {
		dropbox.requesttoken(function(status, request_token) {
			req.session.dropbox.request_token = request_token;
			res.send(request_token.authorize_url +	'&oauth_callback=' + oauth_callback);
		});
	});
};

/**
* Retrieves information about the user's account.
*/
exports.account = function(req, res, callback) {
	var client = createClient(req);
	client.account(function(status, reply) {
		callback(res, reply);
	});
};

/**
* Creates empty file with specified path.
*/
exports.put = function(req, res, callback) {
	if(req.files.length == 0) {
		callback();
		return;
	}

	var path = decodeURI(req.body.path);
	var tmp = req.files[path].path;

	fs.readFile(tmp, function(err, data) {
		if(err) throw err;
		var client = createClient(req);
		client.put(path, data, function(status, reply) {
			fs.unlink(tmp, function(err) {
				if(err) throw err;
				callback(res);
			});
		});
	});
};

/**
* Deletes a file or folder.
*/
exports.rm = function(req, res, callback) {
	var path = decodeURI(req.body.path);
	var client = createClient(req);
	client.rm(path, function(status, reply) {
		callback(res);
	});
};

/**
* Lists directory contents.
*/
exports.ls = function(req, res, callback) {
	if(typeof req.body.path == 'undefined')
		req.body.path = '.';

	var path = decodeURI(req.body.path)
		,	client = createClient(req);

	client.metadata(path, function(status, reply) {
		var result = [];
		if(reply.contents) {
			result = reply.contents.map(function(item) {
				return { path: item.path, is_dir: item.is_dir, bytes: item.bytes };
			});
		}
		callback(res, result);
	});
};

exports.mkdir = function(req, res, callback) {
	if(!checkBodyParam(req, 'path')) {
		callback(res, 'usage: mkdir directory');
		return;
	}

	var path = decodeURI(req.body.path)
		,	client = createClient(req);

	client.mkdir(path, function(status, reply) {
		callback(res, status == 403 ? 'mkdir: ' + path + ': File exists' : null);
	});
};

function checkBodyParam(req, name) {
	return req.body.hasOwnProperty(name);
}

function authenticate(req, res, next) {
	if(req.session.dropbox == undefined || req.session.dropbox.access_token == undefined)
		res.status(401).send();
	next();
}

function createClient(req) {
	return dropbox.client(req.session.dropbox.access_token);
}
