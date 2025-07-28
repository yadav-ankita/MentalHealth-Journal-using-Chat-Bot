const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.Gemini = {
  getReply: async (prompt) => {
    try {
      // Latest and most recommended models (as of July 2025):
      // 'gemini-2.5-flash' - Latest stable 2.5 Flash (recommended for most use cases)
      // 'gemini-2.5-pro' - Latest stable 2.5 Pro (for complex tasks)
      // 'gemini-2.0-flash' - Stable 2.0 Flash
      // 'gemini-1.5-flash' - Legacy but stable 1.5 Flash
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  },

  // Alternative method with more configuration options
//   getReplyWithConfig: async (prompt, config = {}) => {
//     try {
      // Model options from latest to older:
      // 'gemini-2.5-flash' - Latest stable (1M tokens, 65K output, thinking capability)
      // 'gemini-2.5-pro' - Most capable (1M tokens, 65K output, thinking capability)
      // 'gemini-2.0-flash' - Fast and efficient (1M tokens, 8K output)
      // 'gemini-1.5-flash' - Legacy stable (1M tokens, 8K output)
    //   const model = genAI.getGenerativeModel({ 
    //     model: config.model || 'gemini-2.5-flash',
    //     generationConfig: {
    //       temperature: config.temperature || 0.7,
    //       topP: config.topP || 0.95,
    //       topK: config.topK || 64,
    //       maxOutputTokens: config.maxOutputTokens || 8192,
    //     },
    //   });
      
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       return response.text();
//     } catch (error) {
//       console.error('Gemini API Error:', error);
//       throw error;
//     }
//   },

  // Method to list available models (useful for debugging)
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