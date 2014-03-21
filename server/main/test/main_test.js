var assert = require('chai').assert,
    request = require('supertest'),
    nock = require('nock'),
    config = require('../../config');

var app;



describe('Make sure config works', function() {
  it("should have all needed settings in config");
});

describe('Main unauthorized', function(){

  beforeEach(function() {
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

});

describe('Main authorized', function(){
  it("should let you view / if authorized ");
});


describe('Make sure config works', function() {
  it("should have all needed settings in config");
});
