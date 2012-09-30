/**
* Help module.
*/
define(function() {
	return {
		/**
		* Shows help.
		*/
		help: function(callback) {
			var result = '';
			for(var i = 0; i < modules.length; i++) {
				var module = modules[i];
				if(module.hasOwnProperty('_help'))
					result += module['_help'].apply();
			}
			callback(result);
		}
	};
});