var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    movies: [],
    rated: {},
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;