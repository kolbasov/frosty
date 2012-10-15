/**
* Login module.
*/
define(function() {
	return {
		login: function(callback) {
			//document.location.href = document.location.href + 'auth/twitter';
			$.get('/auth/twitter', null, function(url) {
				document.location.href = url;
				callback('<div>logging in</div>')
			});
			callback('<div>logging in</div>');
		},

		_help: function() {
			return '<div>login - log into the frosty</div>'
		}
	};
});

