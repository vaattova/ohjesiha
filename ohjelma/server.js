var express = require('express');

var app = express();

var path = require('path');


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'pages', 'etusivu.html'));
});


app.get('/kysely', function(req, res){
	res.sendFile(path.join(__dirname, 'pages', 'kysely.html'));

});

app.get('/kala', function(req, res){
	res.send("kala")

});

var server = app.listen(3000, function () {
   var host = "127.0.0.1"
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
