
const Social = require('../models/social');
const Tweet = require('../models/tweets');
const User = require('../models/user');

const Boom = require('boom');


exports.findfollowing = {
  auth: false,

  handler: function (request, reply) {
    Social.find({}).then(social => {
      reply(social);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing database'));
    });
  },

};