const PassportJWT = require('passport-jwt');
const ExtractJWT = PassportJWT.ExtractJwt;
const Strategy = PassportJWT.Strategy;
const config = require('./index.js');
const models = require('@BudgetManager/app/setup');

//Mongoose to access our User model and PassportJWT for our authentication
module.exports = (passport) => {
  const User = models.User;
  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  };
  passport.use(new Strategy(parameters, (payload, done) => {
    User.findOne({ id: payload.id }, (error, user) => {
      if (error) return done(error, false);
      if (user) done(null, user);
      else done(null, false);
    });
  }));
}

//instantiate our User model and then get a user by matching the JWT token with the token got from the client
