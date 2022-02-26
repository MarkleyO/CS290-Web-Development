/*
 * Write your server code in this file.  Don't forget to add your name and
 * @oregonstate.edu email address below.
 *
 * name: Owen Markley
 * email: markleyo@oregonstate.edu
 */
var http = require('http');
var fs = require('fs');
var PORT = process.env.PORT || 3000;
var cachedURL = [];
var cachedFiles = [];
var cache404 = null;

function requestHandler(req, res){
	console.log('==Got Request!');
	console.log('  - method:', req.method);
	console.log('  - url:', req.url);
	console.log('  - headers:', req.headers);

	if(cachedURL.includes(req.url)){
		res.statusCode = 200;
		res.end(cachedFiles[cachedURL.indexOf(req.url)]);
	}
	else{
		res.statusCode = 200;
		if(req.url == '/index.html' || req.url == '/'){
			cachedURL.push(req.url);
			cachedFiles.push(fs.readFileSync('public/index.html'));
			res.end(cachedFiles[cachedURL.indexOf(req.url)]);
		}
		else if(req.url == '/style.css'){
			cachedURL.push(req.url);
			cachedFiles.push(fs.readFileSync('public/style.css'));
			res.end(cachedFiles[cachedURL.indexOf(req.url)]);
		}
		else if(req.url == '/index.js'){
			cachedURL.push(req.url);
			cachedFiles.push(fs.readFileSync('public/index.js'));
			res.end(cachedFiles[cachedURL.indexOf(req.url)]);
		}
		else if(req.url == '/benny.jpg'){
			cachedURL.push(req.url);
			cachedFiles.push(fs.readFileSync('public/benny.jpg'));
			res.end(cachedFiles[cachedURL.indexOf(req.url)]);
		}
		else{
			if(cache404==null)
				cache404 = fs.readFileSync('public/404.html');

			res.statusCode = 404;
			res.end(cache404);
		}
	}
	console.log(res.statusCode);

}

var server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
	if(err){
		throw err;
	}
	console.log('==Listening on ', PORT);
});