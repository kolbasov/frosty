/**
* Time module.
*/
define(function() {
	return {
		name: 'time',

		/**
		* Shows current time.
		*/
		time: function(callback) {
			callback(Date());
		},

		help: function() {
			return '<div>time - shows current time</div>';
		}
	};
});