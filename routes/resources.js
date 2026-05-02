const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const { ensureAuth } = require('../middleware/auth');

// GET all resources (Home page)
router.get('/', ensureAuth, async (req, res) => {
  const items = await Resource.find();
  res.render('index', { items, user: req.user });
});

// Show create form
router.get('/new', ensureAuth, (req, res) => {
  res.render('create');
});

// POST create resource
router.post('/', ensureAuth, async (req, res) => {
  await Resource.create(req.body);
  res.redirect('/resources');
});

// Show edit form
router.get('/:id/edit', ensureAuth, async (req, res) => {
  const item = await Resource.findById(req.params.id);
  res.render('edit', { item });
});

// PUT update resource
router.put('/:id', ensureAuth, async (req, res) => {
  await Resource.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/resources');
});

// DELETE resource
router.delete('/:id', ensureAuth, async (req, res) => {
  await Resource.findByIdAndDelete(req.params.id);
  res.redirect('/resources');
});

module.exports = router;