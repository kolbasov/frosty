/**
* Clear module.
*/
define(function() {
	return {
		/**
		* Clears the terminal.
		*/
		clear: function(callback) {
			$('.result').remove();
			callback('', false);
		},

		_help: function() {
<<<<<<< HEAD
			return '<div>clear - clears the terminal</div>'
=======
			return '<div>clear - clears the terminal</div>';
>>>>>>> gh-pages
		}
	};
});