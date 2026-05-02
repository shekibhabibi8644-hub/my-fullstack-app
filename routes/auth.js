const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Passport configuration
passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username });
  if (!user) return done(null, false);
  const match = await bcrypt.compare(password, user.password);
  return match ? done(null, user) : done(null, false);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Show register page
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle register
router.post('/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await User.create({ username: req.body.username, password: hashed });
  res.redirect('/login');
});

// Show login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/resources',
  failureRedirect: '/login'
}));

// Handle logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

module.exports = router;