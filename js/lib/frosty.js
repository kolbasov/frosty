/**
* The brain.
*/
<<<<<<< HEAD
define(['./clear', './gmail', './help', './instagram', './time', './open', './weather'], function() {
=======
define(['./clear', './exit', './gmail', './help', './instagram', './time', './open', './weather'], function() {
>>>>>>> gh-pages
	modules = arguments;

	function getargs(command) {
		var args = command.split(' ');
		var result = $.map(args, function(val, i) {
			if(val != '')
				return val;
		});
		return result;
	}

	return {
		_history: new History(),

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
			var args = getargs(argv);
			var command = args[0];

			if(!command || command.length == 0) {
				callback('');
			} else {
				var module = this.getModuleByCommand(modules, command);
				if(module) {
					this._history.add(argv);
					var method = module[command];
					method.apply(module, [callback].concat(args));
				}
				else
					callback('-frosty: ' + command + ': command not found');
			}
		},

		/**
		* Gets a module with specified command.
		*/
		getModuleByCommand: function (modules, name) {
			for(var i = 0; i < modules.length; i++) {
				var module = modules[i];
				if(module.hasOwnProperty(name))
					return module;
			}
		}
	};
});
