/**
* Instagram module.
*/
define(['jquery'], function($) {
	return {
		name: 'instagram',

		host: 'https://api.instagram.com',
		/**
		* Yeah, I know. It's suppose to be a secret :)
		*/
		client_id: 'client_id=3996c5c31f8b45639c5db7ea5118c1d7',
		popular: '/v1/media/popular?',

		/**
		* Shows popular pictures.
		*/
		instagram: function(callback) {
			this.get(callback);
		},

		/**
		* Gets popular pictures.
		*/
		get: function (callback) {
			var url = this.host + this.popular + this.client_id;
			console.log(url);
			var result;
			$.getJSON(
				url + '&callback=?',
				function(data, textStatus) {
					var result = '';
					for(var i = 0; i < data.data.length; i++){
						var item = data.data[i];
						var img = '<a href="' + item.link + '" target="_blank"><img src="' + item.images.thumbnail.url + '"/></a>';
						result += img;
					}
					callback(result);
			});
		},

		help: function() {
			return '<div>instagram - shows popular pictures from ' +
				'<a href="http://instagr.am" target="_blank">instagram</a></div>';
		}
	};
});