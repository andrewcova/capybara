require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  // console.log(id, 'from passport 12');

  User.findById(id).then((user) => {
    // console.log(user, 'from passport 15');
    done(null, user);
    return null;
  })
})

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function (email, password, done) {
    // console.log(email,'from passport.LocalStrategy', password);
    User.findOne({ email }, function (err, user) {
      if (err) { return done(err); }
      // console.log(user, 'user>>>>>');
      if (!user) { return done(null, false);}
      if (user.password && user.password !== password ) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: '/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have this user
        // console.log('user is: ', currentUser)
        done(null, currentUser)
      } else {
        // if not, create user in our db
        new User({
          googleId: profile.id,
          name: profile.displayName,
        }).save().then((newUser) => {
          // console.log('created new user: ', newUser)
          done(null, newUser)
        })
      }
    })
  }),
)


