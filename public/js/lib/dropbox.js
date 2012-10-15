/**
* Dropbox module.
*/
define(['jquery'], function($) {
	function toGB(bytes) {
		return bytes / 1024 / 1024 / 1024;
	}

	function quota(data) {
		return toGB(data.quota_info.quota).toFixed(2);
	}

	function used(data) {
		return toGB(data.quota_info.normal + data.quota_info.shared).toFixed(2);
	}

	function login(callback) {
		$.get('/auth/dropbox', null, function(url) {
			document.location.href = url;
			callback('<div>logging in</div>')
		});
	}

	function account(callback) {
		$.getJSON('/dropbox/account', function(data) {
			console.log(data);
			var result ='<div>';
			result += '<div>quota: ' + quota(data) + ' GB</div>';
			result += '<div>used: ' + used(data) + ' GB</div>';
			result += '</div>';
			callback(result);
		});
	}

	return {
		dropbox: function(callback, base, command) {
			if(typeof command == 'undefined')
				account(callback);
			else if(command == 'login')
				login(callback);
		},

		_help: function() {
			return '<div>dropbox - dropbox client</div>';
		}
	}
});