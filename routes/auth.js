const express = require('express');
const router = express.Router();
const db = require('../models')
const passport = require('../config/ppConfig')


router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/signup', (req, res) => {
  console.log(req.body)
  db.user.findOrCreate({
    where: { email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  })
  .then(([user, created]) => {
    if (created) {
    console.log(`${user.name} was created`);
    passport.authenticate("local", {
      successRedirect: "/",
      successFlash: 'Account created and logging in'
    })(req, res);
    } else {
      console.log('Email already exists');
      req.flash('Email already exists. Please login.')
      res.redirect('/auth/signup')
    }
  })
  .catch(error => {
    console.log('Error');
    res.redirect('/auth/signup')
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}))

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
})

module.exports = router;
