var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/usermodel');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    passport.use('remove', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            //If found, remove user
            console.log("tanne tultiin.");
            User.where({'username': username}).findOneAndRemove(function(err){
                if (err){
                    console.log('Error in removing user: '+err);  
                    throw err;  
                }
                console.log('User removal succesful');    
                return done(null, true);
            
            });

            

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}
