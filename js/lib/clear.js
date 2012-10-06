/**
* Clear module.
*/
define(['jquery'], function() {
	return {
		/**
		* Clears the terminal.
		*/
		clear: function(callback) {
			$('.result').remove();
			callback('', false);
		},

		_help: function() {
			return '<div>clear - clears the terminal</div>';
		}
	};
});