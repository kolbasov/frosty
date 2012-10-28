define(function() {
	return {
		self: {},

		files: [],

		init: function(callback) {
			self = this;
			self.callback = callback;
			document.body.addEventListener('dragover', this.dragover, false);
  		document.body.addEventListener('drop', this.drop, false);
		},

		dragover: function(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy';
		},

		drop: function(evt) {
			evt.stopPropagation();
    	evt.preventDefault();
    	self.files = evt.dataTransfer.files;
    	self.callback(self.files);
		}
	};
});