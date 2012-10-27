/**
* Open module.
*/
define(function() {
	return {
		name: 'open',

		/**
		* Opens specified url in a new tab.
		*/
		open: function(callback, command, url) {
			window.open('http://' + url);
			callback('<div>opening ' + url + '</div>');
		},

		help: function() {
			return '<div>open - opens specified url in a new tab</div>';
		}
	};
});