const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  content: String,
  published: Boolean
});

module.exports = mongoose.model('Resource', resourceSchema);