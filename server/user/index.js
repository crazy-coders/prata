var express = require('express'),
    app = module.exports = express(),
    passport = require('passport'),
    auth = require('../auth'),
    config = require('../config');

app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({secret: 'blahblah', cookie: { maxAge: 1000000000 }}));

  app.set('views', __dirname + '/../main/views');
  app.use(passport.initialize());
  app.use(passport.session());
}

app.get('/', auth.ensureAuthenticatedUser, function(req, res) {
  res.render('user.ejs', {user: req.user});
});
