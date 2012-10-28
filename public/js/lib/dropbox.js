/**
* Dropbox module.
*/
define(['jquery', 'fileupload'], function($, fileupload) {

	return {

		name: 'dropbox',

		dropbox: function(callback, module, command, param) {
			if(typeof command == 'undefined')
				command = 'account';

			if(this.hasOwnProperty(command)) {
				var method = this[command];
				if(method.length > 1)
					method.apply(this, [param, callback]);
				else
					method.apply(this, [callback]);
			}
		},

		help: function() {
			return '<div>dropbox - dropbox client</div>';
		},

		/**
		* Retrieves information about the user's account.
		*/
		account: function(callback) {
			$.getJSON('/dropbox/account', function(data) {
				var result ='<div>'
					+ '<div>quota: ' + quota(data) + ' GB</div>'
					+	'<div>used: ' + used(data) + ' GB</div>'
					+ '</div>';
				callback(result);
			}).error(function(xhr) {
				handleError(xhr, callback);
			});
		},

		/**
		* Login into dropbox.
		*/
		login: function(callback) {
			$.get('/auth/dropbox', null, function(url) {
				document.location.href = url;
				callback('<div>logging in</div>')
			});
		},

		/**
		* Uploads a file.
		*/
		put: function(path, callback) {
			console.log(this.frosty);
			if(this.frosty.files.length == 0) {
				callback();
				return;
			}

			var file = this.frosty.files[0];
			var form = new FormData();
			form.append('path', encodeURI(path));
			form.append(encodeURI(path), file);

			var xhr = new XMLHttpRequest();
  		xhr.open('POST', '/dropbox/put');
  		xhr.onload = function(e) {
  			callback();
  		};
  		xhr.send(form);
		},

		/**
		* Deletes a file or folder.
		*/
		rm: function(path, callback) {
			$.post('/dropbox/rm', 'path=' + encodeURI(path), function(data, status) {
				callback();
			});
		},

		/**
		* Lists directory contents.
		*/
		ls: function(path, callback) {
			if(typeof path == 'undefined')
				path = '.';

			$.post('/dropbox/ls', 'path=' + encodeURI(path), function(data, status) {
				var result = '<ul>';
				for(var i = 0; i < data.length; i++) {
					result += '<li>' + data[i].path.replace(/^\//, '') + '</li>';
				}
				callback(result);
			});
		},

		mkdir: function(path, callback) {
			if(!path) {
				callback('usage: mkdir directory');
				return;
			}

			$.post('/dropbox/mkdir', 'path=' + encodeURI(path), function(data, status) {
				callback(data);
			}).error(function(xhr) {
				handleError(xhr, callback);
			});
		}
	};

	/**
	* Converts bytes to gygabytes.
	*/
	function toGB(bytes) {
		return bytes / 1024 / 1024 / 1024;
	}

	/**
	* Returns quota in GB.
	*/
	function quota(data) {
		return toGB(data.quota_info.quota).toFixed(2);
	}

	/**
	* Returns used space in GB.
	*/
	function used(data) {
		return toGB(data.quota_info.normal + data.quota_info.shared).toFixed(2);
	}

	/**
	* Handles errors.
	*/
	function handleError(xhr, callback) {
		if(xhr.status == 401) {
			error('unauthorized', callback);
			return;
		}

		error('something terrible has happend', callback);
	}

	function error(message, callback) {
		callback('<div class="error">' + message + '</div>');
	}
});