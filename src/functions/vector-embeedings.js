const { embed } = require('ai');
const { openai } = require('@ai-sdk/openai');

require('dotenv').config();

async function generateEmbeedings(text) {
  try {
    openai.apiKey = process.env.OPENAI_API_KEY;

    const { embedding, usage } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: text,
    });

    return embedding;
  } catch (error) {
    console.error('Error creating embedding:', error);
  }
}

module.exports = { generateEmbeedings };
