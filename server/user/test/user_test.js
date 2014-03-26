var assert = require('chai').assert,
    nock = require('nock'),
    config = require('../../config');

var app,
    request;

describe('User', function(){

  it("should redirect to /auth/login if not authorized when trying to access /user");
  it("should let you view /user if authorized with the correct ids");

});
