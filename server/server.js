const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const asteroidRoutes = require('./routes/asteroids');
app.use('/api/asteroids', asteroidRoutes);

app.get('/api', (req, res) => {
  res.json({
    message: 'AsteroidSheep API v1.0.0',
    endpoints: {
      'GET /api/asteroids': 'Get all asteroids',
      'POST /api/asteroids': 'Create new asteroid',
      'GET /api/asteroids/:id': 'Get asteroid by ID',
      'PUT /api/asteroids/:id': 'Update asteroid by ID',
      'DELETE /api/asteroids/:id': 'Delete asteroid by ID'
    }
  });
});

const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`AsteroidSheep server running on port ${PORT}`);
});

module.exports = app;
