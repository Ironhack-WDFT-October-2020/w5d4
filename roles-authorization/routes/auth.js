const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})


router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 8) {
    res.render('auth/signup', {
      message: 'Your password must be 8 characters minimun.'
    });
    return;
  }
  if (username === '') {
    res.render('auth/signup', { message: 'Your username cannot be empty' });
    return;
  }
  User.findOne({ username: username }).then(found => {
    if (found !== null) {
      res.render('auth/signup', { message: 'This username is already taken' });
    } else {
      // we can create a user with the username and password pair
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({ username: username, password: hash })
        .then(dbUser => {
          // login with passport 
          req.login(dbUser, err => {
            if (err) {
              next(err);
            } else {
              res.redirect('/');
            }
          })
        })
        .catch(err => {
          next(err);
        });
    }
  });
});

module.exports = router;