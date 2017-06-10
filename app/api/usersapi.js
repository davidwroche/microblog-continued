'use strict'

const User = require('../models/user');
const Boom = require('boom');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

exports.find = {
  auth: false,

  handler: function (request, reply) {
    User.find({}).exec().then(users => {
      reply(users);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing database'));
    });
  },

};

exports.findOne = {

  auth: false,

  handler: function (request, reply) {
    User.findOne({ _id: request.params.id }).then(user => {
      if (user != null) {
        reply(user);
      }

      reply(Boom.notFound('id not found'));
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.create = {

  auth: false,

  handler: function (request, reply) {

    const user = new User(request.payload);
    var x = user.password;
    user.password = bcrypt.hashSync(x, salt);
    user.save().then(newUser => {
      reply(newUser).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error creating user'));
    });
  },

};

exports.deleteAll = {

  auth: false,

  handler: function (request, reply) {
    User.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing users'));
    });
  },

};

exports.deleteOne = {

  auth: false,

  handler: function (request, reply) {
    User.remove({ _id: request.params.id }).then(user => {
      reply(user).code(204);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.Settings = {

  auth: false,
  handler: function (request, reply) {
    const editedUser = request.payload;
    var x = editedUser.password;

    User.findOne({ _id: editedUser._id }).then(user => {
      user.email = editedUser.email;
      user.password = bcrypt.hashSync(x, salt);
      user.save();
      reply(user).code(204);
    }).catch(err => {
      reply(Boom.notFound('settings not updated'));
    });
  },
};
