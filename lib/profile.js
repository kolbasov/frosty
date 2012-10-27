var storage = require('./storage');

function get(user, field, callback) {
	storage.get('user:' + user.user_id, field, function(err, value) {
		callback(err, JSON.parse(value));
	});
}

function set(user, field, value) {
	storage.set('user:' + user.user_id, field, value);
};

exports.getDropboxAccessToken = function(user, callback) {
	get(user, 'dropbox_access_token', callback);
};

exports.setDropboxAccessToken = function(user, token) {
	var value = JSON.stringify(token);
	console.log('getDropboxAccessToken: ' + user + ', ' + value);
	set(user, 'dropbox_access_token', value);
};
