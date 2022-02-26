/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Owen Markley
 * Email: markley.owen@gmail.com
 */

var path = require('path');
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var data = require('./postData');
var port = 5401;//process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get(['/', '/index.html'], function(req, res, next){
	res.status(200).render('card', {
		posts: data
	})
});

app.get('/posts/:number', function(req, res, next){
	var number = req.params.number;
	if(data.length < number){
		res.status(404).render('404', {});
	}
	res.status(200).render('partials/postTemp', data[number]);
});

app.get('*', function (req, res) {
  res.status(404).render('404',{});
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
