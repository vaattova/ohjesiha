var Movie = require('../../models/moviemodel');
var User = require('../../models/usermodel');


module.exports = function(req,res) {

	var objId = require('mongoose').Types.ObjectId; 

	var movielist = [];

	User.findOne({ 'username': req.user.username}, function(err, doc){

		movielist = doc.movies;

		Movie.find().where('title').in(movielist).exec(function(err, docs){
			res.render('movielist', {movies: docs});
	});
	});



}