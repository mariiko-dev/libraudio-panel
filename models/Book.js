const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  title: String,
  audioFile: String
});

const BookSchema = new mongoose.Schema({
  id: String,
  title: String,
  author: String,
  lister: String,
  img: String,
  img_audio: String,
  txt: String,
  rating: Number,
  summary: String,
  genre: [String],
  chapters: [ChapterSchema]
});

module.exports = mongoose.models.Book || mongoose.model('Book', BookSchema);
