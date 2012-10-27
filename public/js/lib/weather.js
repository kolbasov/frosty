/**
* Weather module.
*/
define(function() {
	return {
		name: 'weather',

		/**
		* Shows current weather for specified city.
		*/
		weather: function(callback, command, city) {
			if(city) {
				var result = '<a href="http://clck.yandex.ru/redir/dtype=stred/pid=7/cid=1228/*http://pogoda.yandex.ru/' + city + '">';
				result += '<img src="http://info.weather.yandex.net/' + city + '/2_white.ru.png" border="0" alt=""/>';
				result += '<img width="1" height="1" src="http://clck.yandex.ru/click/dtype=stred/pid=7/cid=1227/*http://img.yandex.ru/i/pix.gif" alt="" border="0"/></a>';
				callback(result);
			}
			else {
				callback('<div>please, specify a city</div>');
			}
		},

		help: function() {
			return '<div>weather - shows current weather for specified city</div>';
		}
	};
});