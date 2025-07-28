const Chat = require('../model/Chat');
const Symptom = require('../model/Symptom');
const { StatusCodes } = require('http-status-codes');
const { Gemini } = require('../utils/gemini');
const { BadRequestError } = require('../error');
const sendChat = async (req, res) => {
    const createdBy = req.user.userId;
    const { message } = req.body;

    if (!createdBy || !message) {
        throw new BadRequestError('Please provide userId and message');
    }

    let chat = await Chat.findOne({ createdBy });

    if (!chat) {
        chat = await Chat.create({ createdBy, messages: [] });
    }

    const userMessage = {
        sender: 'user',
        message: message.trim(),
        timestamp: new Date()
    };
    chat.messages.push(userMessage);

    // Tight prompt to keep Gemini concise
    const prompt = `
You are a concise mental health assistant.
Reply in 2-3 short sentences.
Avoid long explanations.
Be practical, clear, and friendly.
User: "${message}"
AI: `;

    const aiResponse = await Gemini.getReply(prompt);

    // Add AI message
    const aiMessage = {
        sender: 'ai',
        message: aiResponse.trim(),
        timestamp: new Date()
    };
    chat.messages.push(aiMessage);

    await chat.save();

    res.status(StatusCodes.OK).json({ reply: aiResponse.trim() });
};

const submitSymptom = async (req, res) => {
    const createdBy = req.user.userId
    const { symptoms } = req.body;

    if (!createdBy || !symptoms || symptoms.length === 0) {
        throw new BadRequestError('Please provide userId and symptoms');
    }

    const prompt = `
  User reports the following symptoms:\n ${symptoms.map(s => `- ${s.name} (${s.severity})`).join('\n')}\nGive a possible cause and a suggestion.
  Give a short, clear AI assessment (5-6 lines max), and a practical suggestion (2-3 steps only). Respond in this format:
  Assessment: ...
  Suggestion: ...
  `;

    const aiText = await Gemini.getReply(prompt);
    const [aiAssessmentRaw, aiSuggestionRaw] = aiText.split(/Suggestion:/i);
    const aiAssessment = (aiAssessmentRaw || '').replace(/Assessment:/i, '').trim();
    const aiSuggestion = (aiSuggestionRaw || '').trim();

    const report = await Symptom.create({
        createdBy,
        symptoms,
        aiAssessment: aiAssessment.trim(),
        aiSuggestion: aiSuggestion.trim()
    });

    res.status(StatusCodes.CREATED).json({
        aiAssessment: report.aiAssessment,
        aiSuggestion: report.aiSuggestion
    });
};
module.exports = {
    sendChat,
    submitSymptom,
};
