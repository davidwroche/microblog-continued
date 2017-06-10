const UsersApi = require('./app/api/usersapi');
const TweetApi = require('./app/api/tweetsapi');
const SocialApi = require('./app/api/socialapi');


module.exports = [

  //User API Routes
  { method: 'GET', path: '/api/users', config: UsersApi.find }, //works
  { method: 'GET', path: '/api/users/{id}', config: UsersApi.findOne }, //works
  { method: 'POST', path: '/api/users', config: UsersApi.create }, //works
  { method: 'DELETE', path: '/api/users/{id}', config: UsersApi.deleteOne }, //works
  { method: 'DELETE', path: '/api/users', config: UsersApi.deleteAll },
  { method: 'POST', path: '/api/users/update', config: UsersApi.Settings },

  //Tweets API Routes
  { method: 'GET', path: '/api/tweets', config: TweetApi.findallTweets },  //works
  { method: 'GET', path: '/api/poster/{id}/tweets', config: TweetApi.findTweets }, //works
  { method: 'GET', path: '/api/tweets/{id}', config: TweetApi.findOne }, //works
  { method: 'POST', path: '/api/users/{id}/tweets', config: TweetApi.makeTweet },
 // { method: 'POST', path: '/api/tweets', config: TweetApi.makeTweet },
  { method: 'DELETE', path: '/api/tweets/{id}', config: TweetApi.deleteOne }, //works
  { method: 'DELETE', path: '/api/tweets', config: TweetApi.deleteAllTweets }, //works

    //Social API Routes
  { method: 'GET', path: '/api/social', config: SocialApi.findfollowing },


];
