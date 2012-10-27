/**
* Clear module.
*/
define(['jquery'], function() {
	return {
		name: 'clear',
		/**
		* Clears the terminal.
		*/
		clear: function(callback) {
			$('.result').remove();
			callback('', false);
		},

		help: function() {
			return '<div>clear - clears the terminal</div>';
		}
	};
});