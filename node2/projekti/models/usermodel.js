var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crypto = require('crypto');

var userSchema = new Schema({
    username: String,
    password: String,
    email: String
});
 
var User = mongoose.model('User', userSchema);

module.exports = User;
