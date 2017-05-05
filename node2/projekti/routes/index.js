var express = require('express');
var router = express.Router();
var apiCall = require('../public/javascripts/omdbapi');
var getMovieList = require('../public/javascripts/lister');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/login');
}

module.exports = function(passport){

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Welcome page' });
    });

    router.get('/movielist', isAuthenticated, function(req, res) {
    	getMovieList(req, res);

    	//This called in gerMovieList... Async...
    	//res.render('movielist', { movies: moviesList});
        
    });

    router.get('/login', function(req, res){
        res.render('login', { message: req.flash('message') });
    });

    /* GET signup*/
    router.get('/signup', function(req, res){
        res.render('signup', {message: req.flash('message')});
    });

    //GET remove
    router.get('/remove', isAuthenticated, function(req, res){
        res.render('remove', { message: req.flash('message') });
    });

    //POST to Login
    router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
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
    router.get('/home', isAuthenticated, function(req, res) {
        res.render('home', { user: req.user });
    });

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/addmovie', isAuthenticated, function(req, res) {
        res.render('addmovie');
    });

    router.post('/addmovie', function(req, res) {
        apiCall(req);
        res.render('home', {user: req.user });
    })

    return router;

}

