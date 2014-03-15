var express = require('express'),
    app = module.exports = express(),
    Parse = require('parse').Parse,
    passport = require('passport'),
    auth = require('../auth'),
    config = require('../config');


Parse.initialize(config.parse.appId, config.parse.jsKey);

app.configure(function() {
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(express.cookieParser());
  app.use(express.session({secret: 'blahblah', cookie: { maxAge: 1000000000 }}));

  app.set('views', __dirname + '/../main/views');
  app.use(passport.initialize());
  app.use(passport.session());
  app.all('*', auth.ensureAuthenticatedUser);
});

app.get('/messages',
  function(req, res) {
    var Messages = Parse.Object.extend("Messages");
    var query = new Parse.Query(Messages);
    query.find({
      success: function(results_messages) {

        var Users = Parse.Object.extend("Users");
        var query = new Parse.Query(Users);
        query.find({
          success: function(results_users) {
            res.json({
              messages: results_messages,
              users: results_users
            });
          }.bind(this)
        });
      }.bind(this)
    });
  }
);

app.post('/messages', function(req, res) {
  var Messages = Parse.Object.extend("Messages");

  var object = {'userId': req.user.objectId, 'message': req.body.message.message};
  new Messages().save(object).then(
    function(trans) {
      res.send(200);
    }.bind(this),
    function(error) {
      console.log(error);
      res.send(500, { error: 'something blew up' });
    }.bind(this));
});

app.get('/users',
  function(req, res) {

    var User = Parse.Object.extend("Users");
    var query = new Parse.Query(User);
    query.find({
      success: function(results) {
        res.json({users: results});
      }.bind(this)
    });
  }
);

app.get('/users/:id',
  function(req, res) {

    var User = Parse.Object.extend("Users");
    var query = new Parse.Query(User);
    query.equalTo("objectId", req.params.id);
    query.find({
      success: function(results) {
        res.json({user: results});
      }.bind(this)
    });
  }
);

app.post('/users/:id',
  function(req, res) {

    var User = Parse.Object.extend("Users");
    var user = new User();
    user.id = req.params.id;
    user.set("color", req.body.color);

    user.save(null, {
      success: function(point) {
        res.redirect('/user');
      },
      error: function(point, error) {
        res.redirect('/user');
      }
    });
  }
);

app.post('/users', function(req, res) {
  var User = Parse.Object.extend("Users");

  new User().save({'username': req.body.username}).then(
    function(trans) {
      res.send(200);
    }.bind(this),
    function(error) {
      console.log(error);
      res.send(500, { error: 'something blew up' });
    }.bind(this));
});
