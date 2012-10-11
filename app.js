var express = require('express'),
		http = require('http'),
		path = require('path');

var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8080);
console.log('listening on port 8080');
