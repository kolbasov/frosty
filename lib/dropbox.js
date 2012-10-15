/**
* Dropbox module.
*/
var dbox = require('dbox');
var dropbox = dbox.app({
	'app_key': process.env.DROPBOX_APP_KEY,
	'app_secret': process.env.DROPBOX_APP_SECRET
});

var oauth_callback = 'http://localhost:8080/auth/dropbox/callback/';

exports.setup = function(app) {
	app.use('/auth/dropbox/callback', function(req, res) {
		console.log('/auth/dropbox/callback');
		console.log(req.session.dropbox);
		if(req.session.dropbox) {
			dropbox.accesstoken(req.session.dropbox.request_token, function(status, access_token){
				req.session.dropbox.access_token = access_token;
				res.redirect('/');
			});
		}
	});

	app.use('/auth/dropbox', function(req, res) {
		dropbox.requesttoken(function(status, request_token) {
			req.session.dropbox = {
				request_token: request_token
			};
			res.send(request_token.authorize_url +	'&oauth_callback=' + oauth_callback);
		});
	});
};

/**
* Retrieves information about the user's account.
*/
exports.account = function(req, res, callback) {
	var client = dropbox.client(req.session.dropbox.access_token);
	client.account(function(status, reply){
		callback(res, reply);
	});
};