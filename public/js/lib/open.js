/**
* Open module.
*/
define(function() {
	return {
		/**
		* Opens specified url in a new tab.
		*/
		open: function(callback, command, url) {
			window.open('http://' + url);
			callback('<div>opening ' + url + '</div>');
		},

		_help: function() {
			return '<div>open - opens specified url in a new tab</div>';
		}
	};
});