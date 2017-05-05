var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/usermodel');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    passport.use('remove', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 

            //Etsii nimella
            User.findOne({'username': username}, function(err, user){
                if (err){
                    return done(err);
                }
                //jos ei löydy, tieto Flashille
                if (!user){
                    console.log("User not found with the username " +username);
                    return done(null, false, req.flash('message', 'User not found'));
                }

                //Löytyy mut väärä salasana
                if(!isValidPassword(user, password)){
                    console.log('Invalid password');
                    return done(null, false, req.flash('message', 'Invalid Password'));
                }

                //Poistetaan ja deserializoidaan null... jotenkin toimii kai.
                user.remove();
                return done(null, null);
            });
        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}
