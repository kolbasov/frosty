/**
* Exit module.
*/
define(function() {
	return {
		name: 'exit',
		/**
		* Closes the terminal window.
		*/
		exit: function(callback) {
			window.open('','_self');
    	window.close();
		},

		help: function() {
			return '<div>exit - closes the terminal window</div>';
		}
	};
});