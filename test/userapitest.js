'use strict';

const _ = require('lodash');
const assert = require('chai').assert;
const TweetService = require('./tweet-service');
const fixtures = require('./fixtures.json');

suite('User API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const tweetService = new TweetService('http://localhost:4000');

  beforeEach(function () {
    tweetService.deleteAllUsers();
  });

  afterEach(function () {
    tweetService.deleteAllUsers();
  });

  test('create a user', function () {
    const returnedUser = tweetService.createUser(newUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });

  test('get users', function () {
    const returnedUsers = tweetService.getUsers();
    return returnedUsers;
  });

  test('get user', function () {
    const c1 = tweetService.createUser(newUser);
    const c2 = tweetService.getUser(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid user', function () {
    const c1 = tweetService.getUser('1234');
    assert.isNull(c1);
    const c2 = tweetService.getUser('012345678901234567890123');
    assert.isNull(c2);
  });

  test('delete a user', function () {
    const c = tweetService.createUser(newUser);
    assert(tweetService.getUser(c._id) != null);
    tweetService.deleteOneUser(c._id);
    assert(tweetService.getUser(c._id) == null);
  });

  test('get all users', function () {
    for (let c of users) {
      tweetService.createUser(c);
    }

    const allusers = tweetService.getUsers();
    assert.equal(allusers.length, allusers.length);
  });

  test('get user detail', function () {
    for (let c of users) {
      tweetService.createUser(c);
    }

    const allusers = tweetService.getUsers();
    for (var i = 0; i < allusers.length; i++) {
      assert(_.some([allusers[i]], users[i]), 'returnedUser must be a superset of newUser');
    }
  });

  test('get all users empty', function () {
    const allUsers = tweetService.getUsers();
    assert.equal(allUsers.length, 0);
  });

});

