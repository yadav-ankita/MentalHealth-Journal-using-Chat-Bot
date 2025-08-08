const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.Gemini = {
  getReply: async (prompt) => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  },
  listModels: async () => {
    try {
      const models = await genAI.listModels();
      return models;
    } catch (error) {
      console.error('Error listing models:', error);
      throw error;
    }
  }
};