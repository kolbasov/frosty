/**
* Time module.
*/
define(function() {
	return {
		/**
		* Shows current time.
		*/
		time: function(callback) {
			callback(Date());
		},

		_help: function() {
			return '<div>time - shows current time</div>';
		}
	};
});