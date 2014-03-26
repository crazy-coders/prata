var assert = require('chai').assert,
    nock = require('nock'),
    config = require('../../config');

describe('API', function(){

  describe('messages', function() {
    it("should return messages and users on GET");
    it("should return error on missing params on POST");
    it("should create a new message and return it's id on POST");
  });


  describe('users', function() {
    it("should return user based on id");
    it("should return error missing user");
    it("should return current user if signed in");
    it("should create a new user on POST");
    it("should create an error on user on POST if missing params");
  });

});
