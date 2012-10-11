/**
* GUID Module.
*/
define(['uuid'], function(require) {
	return {
		guid: function(callback) {
			return callback(uuid.v4());
		},

		_help: function() {
			return '<div>guid - generates a GUID</div>';
		}
	};
});