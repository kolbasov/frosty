var express = require('express')
	,	http = require('http')
	,	path = require('path')
	,	routes = require('./routes');

var frosty = require('./lib/frosty');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser('Captain Jack Sparrow'));
app.use(express.session());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);
frosty.setup(app);

app.listen(8080);
console.log('listening on port 8080');
