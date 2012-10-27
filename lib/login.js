/**
* Login module.
*/
var OAuth = require('oauth').OAuth;
var profile = require('./profile');

var oauth = new OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	process.env.TWITTER_CONSUMER_KEY,
	process.env.TWITTER_CONSUMER_SECRET,
	'1.0',
	'http://localhost:8080/auth/twitter/callback',
	'HMAC-SHA1'
);

exports.setup = function(app) {
	app.get('/auth/twitter', function(req, res) {
		console.log('/auth/twitter');
		oauth.getOAuthRequestToken(function(error, token, token_secret) {
			if(error)	{
				console.log(error);
				throw error;
			}

			req.session.oauth = {
				token: token,
				token_secret: token_secret
			};

			res.send('https://twitter.com/oauth/authenticate?oauth_token=' + token);
		});
	});

	app.get('/auth/twitter/callback', function(req, res, next) {
		console.log('/auth/twitter/callback');
		if(req.session.oauth) {
			req.session.oauth.verifier = req.query.oauth_verifier;

			var oa = req.session.oauth;
			oauth.getOAuthAccessToken(
				oa.token, oa.token_secret, oa.verifier, function(error, access_token, access_token_secret, user) {
					if(error) throw error;
					req.session.user = user;
					req.session.dropbox = {};

					// Not for now.
					// req.session.oauth.access_token = access_token;
					// req.session.oauth.access_token_secret = access_token_secret;

					// Load dropbox access token into session.
					profile.getDropboxAccessToken(user, function(err, access_token) {
						if(err) throw err;
						if(access_token)
							req.session.dropbox.access_token = access_token;
						res.redirect('/');
					});
				}
			);
		}
	});
}
