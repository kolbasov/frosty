var express = require('express')
	, fs = require('fs')
	,	http = require('http')
	,	https = require('https')
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

/*
	Use these commands to generate SSL certificate.
	openssl genrsa -out frosty_key.pem 1024
	openssl req -new -key frosty_key.pem -out frosty_csr.pem
	openssl x509 -req -in frosty_csr.pem -signkey frosty_key.pem -out frosty_cert.pem
*/
var httpsOptions = {
	key: fs.readFileSync(process.env.FROSTY_HTTPS_KEY || 'frosty_key.pem'),
	cert: fs.readFileSync(process.env.FROSTY_HTTPS_CERT || 'frosty_cert.pem')
};

// Lets use both HTTP and HTTPS.
http.createServer(app).listen(8080);
https.createServer(httpsOptions, app).listen(43443);

console.log('listening on ports 8080 and 43443');