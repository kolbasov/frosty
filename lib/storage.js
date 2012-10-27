var redis = require('redis'),
		client = redis.createClient();

client.on('error', function(err) {
	console.log('redis error: ' + err);
});

exports.set = function(key, field, value) {
	client.hset(key, field, value);
};

exports.get = function(key, field, callback) {
	client.hget(key, field, function(err, reply) {
		callback(err, reply);
	});
};
