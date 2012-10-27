define(function() {
	return {
		files: [],

		self: {},

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
		},

		getFile: function(callback) {
			self.read(self.files[0], callback);
		},

		read: function(file, callback) {
			var reader = new FileReader();
			reader.onload = (function(f) {
				return function(e) {
					var result = self.toBytes(e.target.result);
					console.log('result', result);
					callback(result);
				};
			})(file);
			reader.readAsBinaryString(file);
		},

		toBytes: function(text) {
			var result = [];
			for(var i = 0; i < text.length; ++i)
				result.push(text.charCodeAt(i));
			return result;
		}
	};
});