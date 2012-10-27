/**
* Login module.
*/
define(function() {
	return {
		name: 'login',

		login: function(callback) {
			$.get('/auth/twitter', null, function(url) {
				document.location.href = url;
				callback('<div>logging in</div>')
			});
		},

		help: function() {
			return '<div>login - log into the frosty</div>'
		}
	};
});

