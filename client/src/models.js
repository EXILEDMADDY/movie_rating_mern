const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);
const Movie = mongoose.model('Movie', movieSchema);

module.exports = { User, Movie };
