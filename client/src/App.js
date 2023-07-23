const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Movie } = require('./models');
mongoose.Promise = require('bluebird');

const app = express();
const PORT = 3000; // Change this to the desired port number

// Connect to MongoDB (replace 'mongodb://localhost:27017/movie_rating_db' with your MongoDB connection string)
mongoose.connect('mongodb+srv://manavchotu999:AhrCkvSWyIIw7leP@cluster0.r0uks7z.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());


// Collect Movies Data from the API and Store in the Database
app.get('/api/collect-movies', async (req, res) => {
  try {
    // Fetch movie data from the external API 
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e0a11147b9c1a0382af533a13f58353c&language=en-US&page=1`);
    const moviesData = response.data.results;

    // Store each movie in the MongoDB database
    for (const movieData of moviesData) {
      const movie = new Movie({
        title: movieData.title,
      });
      await movie.save();
      console.log(`Movie "${movieData.title}" saved to the database.`);
    }

    res.json({ message: 'Movie data collected and saved to the database' });
  } catch (err) {
    console.error('Error collecting movie data:', err);
    res.status(500).json({ error: 'Failed to collect movie data' });
  }
});

// User Registration
app.post('/api/register', async (req, res) => {
  // ... (same as in previous steps)
});

// User Login and Access Token Generation
app.post('/api/login', async (req, res) => {
  // ... (same as in previous steps)
});

// Middleware to validate the access token
const validateToken = (req, res, next) => {
  // ... (same as in previous steps)
};

// Retrieve Movies List
app.get('/api/movies', validateToken, async (req, res) => {
  // ... (same as in previous steps)
});

// Rate a Movie
app.post('/api/rate-movie', validateToken, async (req, res) => {
  // ... (same as in previous steps)
});

// Open API to View Average Rating of Each Movie
app.get('/api/movies/average-rating', async (req, res) => {
  try {
    const movies = await Movie.find({});
    const movieRatings = {};

    for (const movie of movies) {
      const totalRatings = movie.rating.length;
      const averageRating = totalRatings > 0 ? movie.rating.reduce((sum, rating) => sum + rating, 0) / totalRatings : 'NA';
      movieRatings[movie.title] = averageRating;
    }

    res.json(movieRatings);
  } catch (err) {
    console.error('Error fetching movie ratings:', err);
    res.status(500).json({ error: 'Failed to fetch movie ratings' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



