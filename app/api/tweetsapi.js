'use strict'

const Tweet = require('../models/tweets');
const Boom = require('boom');

exports.findallTweets = {
  auth: false,

  handler: function (request, reply) {
    Tweet.find({}).then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing database'));
    });
  },

};

exports.findTweets = {

  auth: false,

  handler: function (request, reply) {
    Tweet.find({ poster: request.params.id }).then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },
};

exports.findOne = {
  auth: false,

  handler: function (request, reply) {
    Tweet.findOne({ _id: request.params.id }).then(tweet => {
      if (tweet != null) {
        reply(tweet);
      }

      reply(Boom.notFound('id not found'));
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.makeTweet = {

  auth: false,

  handler: function (request, reply) {
    const tweet = new Tweet(request.payload);
    tweet.poster = request.params.id;
    tweet.save().then(newTweet => {
      reply(newTweet).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error creating tweet'));
    });
  },

};

exports.deleteAllTweets = {

  auth: false,

  handler: function (request, reply) {
    Tweet.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing tweets'));
    });
  },

};

exports.deleteOne = {

  auth: false,

  handler: function (request, reply) {
    Tweet.remove({ _id: request.params.id }).then(tweet => {
      reply(tweet).code(204);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};


