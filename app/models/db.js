/**
 * Created by Tosh on 10/10/2016.
 */
'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//let dbURI = 'mongodb://microblog:microblog@ds039427.mlab.com:39427/mircoblog';

// let dbURI = 'mongodb://david:password@ec2-35-164-137-204.us-west-2.compute.amazonaws.com:27017/dummyDB';

let dbURI = 'mongodb://ec2-35-166-14-20.us-west-2.compute.amazonaws.com:27017/dummyDB';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
