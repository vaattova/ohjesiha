var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
    return next();

}
}

module.exports = function(passport){

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Main' });
    });

    router.get('/userlist', function(req, res) {
        var User = require('../models/usermodel');

        User.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    });

    router.get('/login', function(req, res){
        res.render('login', { message: req.flash('message') });
    });

    /* GET signup*/
    router.get('/signup', function(req, res){
        res.render('signup', {message: req.flash('message')});
    });

    //GET remove
    router.get('/remove', function(req, res){
        res.render('remove', { message: req.flash('message') });
    });

    //POST to Login
    router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
    }));

    // POST to Sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true  
    }));

        //POST to remove
    router.post('/remove', passport.authenticate('remove', {
        successRedirect: '/',
        failureRedirect: '/remove',
        failureFlash : true 
    }));

    //GET home
    router.get('/home', isAuthenticated, function(req, res){
        res.render('home', { user: req.user });
    });

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;

}

