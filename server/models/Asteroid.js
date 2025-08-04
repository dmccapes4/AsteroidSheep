const mongoose = require('mongoose');

const asteroidSchema = new mongoose.Schema({
  trajectory: {
    type: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      z: { type: Number, required: true },
      direction: { type: Number, required: true }
    },
    required: true
  },
  velocity: {
    type: Number,
    required: true,
    min: 0,
    max: 1000
  },
  size: {
    type: String,
    required: true,
    enum: ['small', 'medium', 'large', 'massive'],
    default: 'medium'
  },
  threatLevel: {
    type: String,
    required: true,
    enum: ['low', 'moderate', 'high', 'critical'],
    default: 'low'
  },
  discovered: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: false
  },
  mass: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
});

asteroidSchema.methods.calculateThreatLevel = function() {
  const sizeMultiplier = {
    'small': 1,
    'medium': 2,
    'large': 3,
    'massive': 5
  };
  
  const velocityFactor = this.velocity / 100;
  const sizeFactor = sizeMultiplier[this.size];
  const threatScore = velocityFactor * sizeFactor;
  
  if (threatScore < 2) return 'low';
  if (threatScore < 5) return 'moderate';
  if (threatScore < 10) return 'high';
  return 'critical';
};

asteroidSchema.pre('save', function(next) {
  if (this.isModified('velocity') || this.isModified('size')) {
    this.threatLevel = this.calculateThreatLevel();
  }
  next();
});

module.exports = mongoose.model('Asteroid', asteroidSchema);
