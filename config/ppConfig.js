const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../models');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
})

passport.deserializeUser((id, cb) => {
  cb(null, id)
  .catch(cb());
});

passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
},(email, password, cb) => {
  db.user.findOne({
    where: { email }
  })
  .then(user => {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  })
  .catch(cb());
}))
