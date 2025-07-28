const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
    name: String,
    severity: { type: String, enum: ['mild', 'moderate', 'severe'] }
});

const symptomReportSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symptoms: [symptomSchema],
    aiAssessment: String,
    aiSuggestion: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Symptom', symptomReportSchema);
