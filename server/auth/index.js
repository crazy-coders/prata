var express = require('express'),
    app = module.exports = express(),
    passport = require('passport'),

    GitHubStrategy = require('passport-github').Strategy,
    config = require('../config');

app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({secret: 'blahblah', cookie: { maxAge: 1000000000 }}));

  app.set('views', __dirname + '/../main/views');
  app.use(passport.initialize());
  app.use(passport.session());
});

// No idea how to test this
passport.serializeUser(function(user, done) {
  var tmp = {id: String(user.id), username: String(user.username)}; // Make sure to always use a string
  done(null, tmp);
});

// No idea how to test this
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy( config.auth.github, function(accessToken, refreshToken, profile, done) { done(null, profile); } ));
app.get('/github',   passport.authenticate('github'));

// This needs to check for valid return handling
app.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/login', function(req, res) {
  res.render('login.ejs', {host: false});
});

// Make sure session is purged
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});


// Make sure it handles facebook and github correctly
app.ensureAuthenticatedUser = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
  {
    if (config.auth.github.ids.indexOf(req.user.id) !== -1)
    {
      return next();
    }
  }
  res.redirect('/auth/login');
};
