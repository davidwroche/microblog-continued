'use strict';
const Social = require('../models/social');
const User = require('../models/user');
const Tweets = require('../models/tweets');

exports.followuser = {

  handler: function (request, reply) {

    let userEmail = request.auth.credentials.loggedInUser;
    let data = request.payload;
    var counter = 0;
    User.findOne({ email: userEmail }).then(foundUser => {
      const Soc = new Social();
      Soc.follower = foundUser._id;
      Soc.following = data.mes;
      Social.find({}).then(foundSocial => {


        //check if social db is empty to begin with
        if (foundSocial.length == 0) {
          Soc.save();
          console.log('Social db is empty');
          reply.redirect('/social');
        }

        for (var i = 0; i <= foundSocial.length; i++) {
          console.log('here2');
          //check if the logged in user has followed this user before

          if (i == foundSocial.length && counter == 0) {
            console.log('here5');
            Soc.save();
            reply.redirect('/social');
          };

          if ((foundSocial[i].follower.equals(Soc.follower) && foundSocial[i].following.equals(Soc.following))) {
            console.log('Saving new user following');
            Social.remove({ _id:  foundSocial[i]._id }).then(foundmatch => {
              counter +=1;
              Soc.save();
              reply.redirect('/social');
            });
          };


        };
      });
    });
  },
};

exports.unfollowuser = {

  handler: function (request, reply) {

    let userEmail = request.auth.credentials.loggedInUser;
    let data = request.payload;

    User.findOne({ email: userEmail }).then(foundUser => {
      Social.find({}).then(foundSocial => {
        if (foundSocial.length == 0) {
          reply.redirect('/social');
        }

        for (var i = 0; i < foundSocial.length; i++) {
          if ((foundSocial[i].follower.equals(foundUser._id) && foundSocial[i].following.equals(data.mes))) {
            Social.remove({ _id: foundSocial[i]._id }).then(
                reply.redirect('/social')
            );
          } /*else {
           reply.redirect('/social');
           }*/
        }
      });
    });
  },
};

exports.social = {

  handler: function (request, reply) {
    var collect = [];
    var specialUsers = [];
    var who = [];
    var tweets = [];
    let userEmail = request.auth.credentials.loggedInUser;
    User.find({}).exec().then(allUsers => {
      User.findOne({ email: userEmail }).then(foundUser => {
        for (var i = 0; i < allUsers.length; i++) {
          if (allUsers[i]._id.equals(foundUser._id)) {  //find where follower and user session match
          } else {
            specialUsers.push(allUsers[i]);   //add user we find that matches following to the array
          }
        };

        Social.find({}).populate('following').populate('follower').then(foundSocial => {
          for (var i = 0; i < foundSocial.length; i++) {
            if (foundSocial[i].follower.equals(foundUser._id)) {  //find where follower and user session match
              User.findOne({ _id: foundSocial[i].following }).then(thisUser => {
                collect.push(thisUser);   //add user we find that matches following to the array
                who.push(thisUser._id.toString());
                console.log(who.toString() + 'hi');
              });
            }
          };

          Tweets.find({}).populate('poster').then(foundTweets => {
            for (var y = 0; y < who.length; y++) {
              console.log('here2');
              for (var x = 0; x < foundTweets.length; x++) {
                if (foundTweets[x].poster.equals(who[y]))
                  tweets.push(foundTweets[x]);
              }
            }

            reply.view('social', { title: 'Social', specialUsers, collect, boom: foundSocial, tweets, });
          });
        });

        /*  Social.find({}).populate('following').populate('follower').then(foundSoc => {
         reply.view('social', { title: 'Social', specialUsers, collect, boom: foundSoc, yo: foundTweets });
         });
         */
      });
    });
  },
};

