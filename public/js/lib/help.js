/**
* Help module.
*/
define(['require', 'modules'], function(require) {
	return {
		/**
		* Shows help.
		*/
		help: function(callback) {
			// We need this because of circular dependencies:
			// 'modules' depends on 'help' and 'help' depends on 'modules'.
			// http://requirejs.org/docs/api.html#circular
			var modules = require('modules');

			var result = [];
			for(var i = 0; i < modules.length; i++) {
				var module = modules[i];
				if(module.hasOwnProperty('_help'))
				    result.push(module['_help'].apply());
			}
			callback(result.sort().join(''));
		}
	};
});
