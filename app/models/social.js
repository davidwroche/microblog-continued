/**
 * Created by Tosh on 12/13/2016.
 */
/**
 * Created by Tosh on 10/10/2016.
 */
const mongoose = require('mongoose');

const socialSchema = mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Social = mongoose.model('Social', socialSchema);
module.exports = Social;
