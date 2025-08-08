const mongoose = require('mongoose');

const HealthGoalSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a goal description'],
    trim: true,
    minlength: 5,
    maxlength: 200,
  },
  targetDate: {
    type: Date,
    default: null, // optional
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('HealthGoal', HealthGoalSchema);
