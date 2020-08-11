const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create our User schema, one user will have: username,
// password, Clients.
// Each client will have: an email, a name, a phone, budgets.
//Every budget will have a state, a title, items and a price.
const Schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  clients: [{}]
});

//generate a salt and hash our users passwords
Schema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//Compare passwords to check if the login attempt is valid or not.
Schema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, matches) => {
    if (error) return callback(error);
    callback(null, matches);
  });
};

mongoose.model('User', Schema);
