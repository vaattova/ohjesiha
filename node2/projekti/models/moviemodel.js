var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    year: String,
    genre: String,
    poster: String,
    rated: String,
    released: String,
    runtime: String,
    director: String,
    writer: String,
    actors: String,
    plot: String,
    language: String,
    country: String,
    awards: String,

});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
