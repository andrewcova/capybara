const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  googleId: String,
  name: String,
  email: {
    unique: true,
    type: String,
  },
  password: String,
  layout: [],
});



module.exports = mongoose.model('User', userSchema)
