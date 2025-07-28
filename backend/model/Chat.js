const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: String, enum: ['user', 'ai'], required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [messageSchema],
    startedAt: { type: Date, default: Date.now },
    type: { type: String, default: 'General Chat' }
});

module.exports = mongoose.model('Chat', chatSchema);
