'use strict';

const _ = require('lodash');
const assert = require('chai').assert;
const TweetService = require('./tweet-service');
const fixtures = require('./fixtures.json');

suite('Tweet API tests', function () {

  let tweets = fixtures.tweets;
  let newTweet = fixtures.newTweet;

  const tweetService = new TweetService('http://localhost:4000');

  beforeEach(function () {
    tweetService.deleteAllTweets();
  });

  afterEach(function () {
    tweetService.deleteAllTweets();
  });

  test('create a tweet', function () {
    const returnedTweet = tweetService.makeTweet(newTweet);
    console.log(returnedTweet);
    assert(_.some([returnedTweet], newTweet), 'returnedTweet must be a superset of newTweet');
    assert.isDefined(returnedTweet._id);
  });

  test('get tweets', function () {
    const returnedTweets = tweetService.getTweets();
    return returnedTweets;
  });

  test('get tweet', function () {
    const c1 = tweetService.makeTweet(newTweet);
    const c2 = tweetService.getTweet(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid tweet', function () {
    const c1 = tweetService.getTweet('1234');
    assert.isNull(c1);
    const c2 = tweetService.getTweet('012345678901234567890123');
    assert.isNull(c2);
  });

  test('delete a tweet', function () {
    const c = tweetService.makeTweet(newTweet);
    assert(tweetService.getTweet(c._id) != null);
    tweetService.deleteOneTweet(c._id);
    assert(tweetService.getTweet(c._id) == null);
  });

  test('get all tweet', function () {
    for (let c of tweets) {
      tweetService.makeTweet(c);
    }

    const alltweets = tweetService.getTweets();
    assert.equal(alltweets.length, alltweets.length);
  });

  test('get tweet detail', function () {
    for (let c of tweets) {
      tweetService.makeTweet(c);
    }

    const alltweets = tweetService.getTweets();
    for (var i = 0; i < alltweets.length; i++) {
      assert(_.some([alltweets[i]], tweets[i]), 'returnedTweet must be a superset of newTweet');
    }
  });

  test('get all tweets empty', function () {
    const allTweets = tweetService.getTweets();
    assert.equal(allTweets.length, 0);
  });


});

