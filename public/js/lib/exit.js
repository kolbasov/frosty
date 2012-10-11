/**
* Exit module.
*/
define(function() {
	return {
		/**
		* Closes the terminal window.
		*/
		exit: function(callback) {
			window.open('','_self');
    	window.close();
		},

		_help: function() {
			return '<div>exit - closes the terminal window</div>';
		}
	};
});