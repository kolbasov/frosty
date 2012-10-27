/**
* Help module.
*/
define(['require', 'modules'], function(require) {
	return {
		name: 'help',
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
				if(module.hasOwnProperty('help') && module.name != 'help')
				    result.push(module['help'].apply());
			}
			callback(result.sort().join(''));
		}
	};
});
