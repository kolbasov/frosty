/**
* Gmail module
*/
define(function() {
	return {
		name: 'gmail',
		/**
		* Opens gmail in a new tab.
		*/
		gmail: function(callback) {
			var url = 'https://gmail.com';
			window.open(url)
			callback('<a href="' + url + '">gmail</a>');
		},

		help: function() {
			return '<div>gmail - opens <a href="https://gmail.com" target="_blank">gmail</a>' +
				' in a new tab</div>';
		}
	};
});