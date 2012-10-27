/**
* The brain.
*/
define(['jquery', 'history', 'modules', 'aliases'], function($, history, modules, aliases) {

		return {
			_history: history,

			/**
			* Next command.
			*/
			next: function() {
				return this._history.next();
			},

			/**
			* Previous command.
			*/
			prev: function() {
				return this._history.prev();
			},

			/**
			* Process command.
			*/
			process: function (argv, callback) {
				argv = handleAliases(argv);
				var args = getargs(argv);

				var command = args[0];

				if(!command || command.length == 0) {
					callback('');
				}
				else {
					var module = getModuleByCommand(modules, command);
					if(module) {
						this._history.add(argv);
						module.frosty = this;
						var method = module[command];
						method.apply(module, [callback].concat(args));
					}
					else
						callback('-frosty: ' + command + ': command not found');
				}
			}
		};

		/**
		* Gets a module with specified command.
		*/
		function getModuleByCommand(modules, name) {
			for(var i = 0; i < modules.length; i++) {
				if(modules[i].name == name)
					return modules[i];
			}
		}

		function getargs(command) {
			var args = command.split(' ');
			var result = $.map(args, function(val, i) {
				if(val != '')	return val;
			});
			return result;
		}

		function handleAliases(args) {
			for(var key in aliases) {
				if(args.indexOf(key) == 0)
					return args.replace(key, aliases[key]);
			}
			return args;
		}
});
