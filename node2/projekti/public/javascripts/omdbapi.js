var Movie = require('../../models/moviemodel');
var User = require('../../models/usermodel');
var https = require('https');

module.exports = function(req) {

	var queryName = req.user.username;

	var optionsget = {
    host : 'omdbapi.com', // domain name
    port : 443,
    path : '/?t=' + encodeURI(req.body.title), //the rest of the url with parameters if needed
    json : true
	};

	var info = "";

	var reqGet = https.get(optionsget, function(res){

		res.on('data', function(chunk) {
        	process.stdout.write(chunk);
        	info += chunk;
        
	    });

		
    	res.on('end', function(data){
        	var leffa = JSON.parse(info);

        	if (leffa.Error){
          		console.log(leffa.Error);
          		return;
        	}

			var newMovie = new Movie();

        	newMovie.title = leffa.Title;
        	newMovie.year = leffa.Year;
        	newMovie.genre = leffa.Genre;
        	newMovie.poster = leffa.Poster;
        	newMovie.rated = leffa.Rated;
    		newMovie.released = leffa.Released;
		    newMovie.runtime = leffa.Runtime;
		    newMovie.director = leffa.Director;
		    newMovie.writer = leffa.Writer;
		    newMovie.actors = leffa.Actors;
		    newMovie.plot = leffa.Plot;
		    newMovie.language = leffa.Language;
		    newMovie.country = leffa.Country;
		    newMovie.awards = leffa.Awards;

    		newMovie.save(function(err) {
		        if (err){
		            console.log('Error in Saving movie: '+err);  
		            throw err;  
		        }
		        console.log('Movie save succesful');    
		    });

		    User.update({ 'username': queryName}, {$push: { 'movies' : newMovie.title }}, {upsert:true}, function(err, data){
		    	if(err){
		    		throw err;
		    	}
		    	console.log("Successfully saved movie " + leffa.Title);
		    });		    
    	});
	});

	reqGet.on('error', function(e) {
    	console.error(e);
	});

	reqGet.end();

}