const express = require('express');
const router = express.Router();
const Asteroid = require('../models/Asteroid');

router.get('/', async (req, res) => {
  try {
    const { threatLevel, size, limit = 50, page = 1 } = req.query;
    const filter = {};
    
    if (threatLevel) filter.threatLevel = threatLevel;
    if (size) filter.size = size;
    
    const skip = (page - 1) * limit;
    
    const asteroids = await Asteroid.find(filter)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });
    
    const total = await Asteroid.countDocuments(filter);
    
    res.json({
      asteroids,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const asteroid = await Asteroid.findById(req.params.id);
    if (!asteroid) {
      return res.status(404).json({ error: 'Asteroid not found' });
    }
    res.json(asteroid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const asteroid = new Asteroid(req.body);
    await asteroid.save();
    res.status(201).json(asteroid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const asteroid = await Asteroid.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!asteroid) {
      return res.status(404).json({ error: 'Asteroid not found' });
    }
    res.json(asteroid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const asteroid = await Asteroid.findByIdAndDelete(req.params.id);
    if (!asteroid) {
      return res.status(404).json({ error: 'Asteroid not found' });
    }
    res.json({ message: 'Asteroid deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Asteroid.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          avgVelocity: { $avg: '$velocity' },
          threatLevels: {
            $push: '$threatLevel'
          },
          sizes: {
            $push: '$size'
          }
        }
      }
    ]);
    
    if (stats.length === 0) {
      return res.json({
        total: 0,
        avgVelocity: 0,
        threatDistribution: {},
        sizeDistribution: {}
      });
    }
    
    const threatDistribution = stats[0].threatLevels.reduce((acc, level) => {
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});
    
    const sizeDistribution = stats[0].sizes.reduce((acc, size) => {
      acc[size] = (acc[size] || 0) + 1;
      return acc;
    }, {});
    
    res.json({
      total: stats[0].total,
      avgVelocity: Math.round(stats[0].avgVelocity * 100) / 100,
      threatDistribution,
      sizeDistribution
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
