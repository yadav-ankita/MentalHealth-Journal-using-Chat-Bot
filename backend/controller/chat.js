const Chat = require('../model/Chat');
const User = require('../model/User')
const Symptom = require('../model/Symptom');
const { StatusCodes } = require('http-status-codes');
const { Gemini } = require('../utils/gemini');
const { BadRequestError } = require('../error');
const sendChat = async (req, res, next) => {
    try {
        const createdBy = req.user.userId;
        const { message } = req.body;

        if (!createdBy || !message) {
            throw new BadRequestError('Please provide  message');
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
        if (!aiResponse) {
            throw new Error('AI response was empty or failed');
        }
        // Add AI message
        const aiMessage = {
            sender: 'ai',
            message: aiResponse.trim(),
            timestamp: new Date()
        };

        chat.messages.push(aiMessage);
        await User.findByIdAndUpdate(createdBy, { lastUpdated: Date.now() });
        await chat.save();

        res.status(StatusCodes.OK).json({ reply: aiResponse.trim() });
    } catch (error) {
        console.log("error sending chat:", error);
        next(error);
    }

};

const submitSymptom = async (req, res, next) => {
    try {
        const createdBy = req.user.userId
        const { symptoms } = req.body;

        if (!createdBy || !symptoms || symptoms.length === 0) {
            throw new BadRequestError('Please provide userId and symptoms');
        }
        for (const symptom of symptoms) {
            if (
                !symptom.name ||
                !symptom.severity ||
                symptom.name.trim() === '' ||
                symptom.severity.trim() === ''
            ) {
                throw new BadRequestError('Each symptom must have a name and severity.');
            }
        }
        const prompt = `
  User reports the following symptoms:\n ${symptoms.map(s => `- ${s.name} (${s.severity})`).join('\n')}\nGive a possible cause and a suggestion.
  Give a short, clear AI assessment (5-6 lines max), and a practical suggestion (4-5 steps only). Respond in this format:
  and also dont give the ** symbol after or before the numbers suggestion..like 1.suggestion 2.suggestion
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
        await User.findByIdAndUpdate(createdBy, { lastUpdated: Date.now() });
        res.status(StatusCodes.CREATED).json({
            aiAssessment: report.aiAssessment,
            aiSuggestion: report.aiSuggestion
        });
    } catch (error) {
        next(error)
    }

};
const getAllChat = async (req, res, next) => {
    try {
        const createdBy = req.user.userId;
        const chats = await Chat.find({ createdBy }).sort({ startedAt: -1 }); // latest first
        res.status(StatusCodes.OK).json({ success: true, data: chats });
    } catch (error) {
        console.error('Error fetching chats:', error);
        next(error);
    }
};
const getAllSymptom = async (req, res, next) => {
    try {
        const createdBy = req.user.userId;
        const symptoms = await Symptom.find({ createdBy }).sort({ createdAt: -1 }); // latest first
        res.status(StatusCodes.OK).json({ success: true, data: symptoms });
    } catch (error) {
        console.error('Error fetching symptoms:', error);
        next(error);
    }
};
module.exports = {
    sendChat,
    submitSymptom,
    getAllChat,
    getAllSymptom
};
