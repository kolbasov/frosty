/**
* GUID Module.
*/
define(['uuid'], function(require) {
	return {
		name: 'guid',

		guid: function(callback) {
			return callback(uuid.v4());
		},

		help: function() {
			return '<div>guid - generates a GUID</div>';
		}
	};
});