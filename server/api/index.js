var express = require('express'),
    app = module.exports = express(),
    Parse = require('parse').Parse,
    config = require('../config/');

Parse.initialize(config.parse.appId, config.parse.jsKey);
app.use(express.urlencoded());
app.use(express.json());

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
            var tmp_users = {};
            results_users.forEach(function(user) {
              tmp_users[user.id] = {username: user.attributes.username, objectId: user.id};
            })

            var messages = [];
            results_messages.forEach(function(message) {
              var obj = {
                "message" : message.attributes.message,
                "user" : tmp_users[message.attributes.userId],
                "createdAt": message.createdAt,
                "objectId": message.id,
                "userId": message.attributes.userId
              };
              messages.push(obj);
            });

            res.json({messages: messages});
          }.bind(this)
        });
      }.bind(this)
    });
  }
);

app.post('/messages', function(req, res) {
  var Messages = Parse.Object.extend("Messages");

  var object = {'userId': req.body.message.userId, 'message': req.body.message.message};
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
