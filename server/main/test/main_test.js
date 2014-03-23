var assert = require('chai').assert,
    nock = require('nock'),
    config = require('../../config');

var app = require('../index').app,
    request = require('supertest')(app);


describe('Make sure config works', function() {
  it("should have all needed settings in config");
});


describe('Main', function(){


  // Remove the isAuthenticated mock function.
  after(function() {
    app.stack.shift();
  });

  it("should redirect to /auth/login if not authorized when trying to access /", function() {
    request
    .get('/')
    .expect(302)
    .end(function(err, res){
      if (err) throw err;
    });
  });

  it("should let you view / if authorized with the correct ids", function() {

    app.stack.unshift({ // First middleware
      route: '',
      handle: function (req, res, next) {
        req.user = {githubId: config.auth.github.ids[0]};

        req.isAuthenticated = function () {
          return true;
        };

        next();
      }
    });

    request
    .get('/')
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
    });
  });

});
