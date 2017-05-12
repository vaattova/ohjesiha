var User = require('../../models/usermodel');


module.exports = function(req, res) {

	var movieL = [];
	movieL.push(req.body.title);

	console.log(movieL);

	User.update( {'username': req.user.username}, { $pullAll: {movies: movieL}}, function(err){
		if (err){
			throw err;
		}
		console.log("Movie removed Successfully");
	});

	res.redirect('/movielist');

}