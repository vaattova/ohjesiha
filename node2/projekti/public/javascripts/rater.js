var User = require('../../models/usermodel');
var Movie = require('../../models/moviemodel')


module.exports = function(req, res) {

	var ratingslist = [];
	var average = 0;
	var amount = 0;

	Movie.update( {'title': req.body.title}, {$push: { 'ratings' : req.body.rating }}, {upsert:true}, function(err){
		if (err){
			throw err;
		}

		Movie.findOne( {'title': req.body.title}, function(err, doc){

			if (err){
				throw err;
			}
			ratingslist = doc.ratings;

			var arrayLength = ratingslist.length;
			for (var i = 0; i < arrayLength; i++) {
			    average += parseFloat(ratingslist[i]);
			    amount += 1;
			    //Do something
			}
			average = average/amount;
			doc.average = (Math.round(average*2)/2).toFixed(1);
			doc.save();

		});
	});

	
	res.redirect('/movielist');

}