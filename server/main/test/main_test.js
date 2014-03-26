var assert = require('chai').assert,
    nock = require('nock'),
    config = require('../../config');

var app,
    request;



describe('Make sure config works', function() {
  it("should have all needed settings in config");
});


describe('Main', function(){


  beforeEach(function() {
    app = require('../index').app;
    request = require('supertest');
  });

  afterEach(function () {
    delete require.cache[require.resolve('../index')];
    delete require.cache[require.resolve('supertest')];
  })

  it("should redirect to /auth/login if not authorized when trying to access /", function() {
    request(app)
    .get('/')
    .expect(302)
    .end(function(err, res){
      if (err) throw err;
    });
  });

  it("should let you view / if authorized with the correct ids");
});
