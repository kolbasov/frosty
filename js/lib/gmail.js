/**
* Gmail module
*/
define(function() {
	return {
		/**
		* Opens gmail in a new tab.
		*/
		gmail: function(callback) {
			var url = 'https://gmail.com';
			window.open(url)
			callback('<a href="' + url + '">gmail</a>');
		},

		_help: function() {
			return '<div>gmail - opens <a href="https://gmail.com" target="_blank">gmail</a>' +
<<<<<<< HEAD
				' in a new tab</div>'
=======
				' in a new tab</div>';
>>>>>>> gh-pages
		}
	};
});