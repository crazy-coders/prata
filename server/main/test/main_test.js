var assert = require('chai').assert,
    request = require('supertest'),
    nock = require('nock'),
    config = require('../../config');

var app;


describe('Make sure config works', function() {
  it("should have all needed settings in config");
});


describe('Main', function(){

  before(function() {
    // Since we're adding things to our app we need to make sure we have an uncache version
    delete require.cache[require.resolve('../index')];
    app = require('../index').app;
  });

  it("should redirect to /auth/login if not authorized when trying to access /", function() {
    request(app)
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

    request(app)
    .get('/')
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
    });
  });

});
