// testOPenAIKey.js
//testOpenAIKey.js

import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();

console.log('OpenAI API Key:', process.env.NEXT_PUBLIC_OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const testOpenAIKey = async () => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // Use a valid model
      prompt: 'Say hello!',
      max_tokens: 5,
    });

    console.log('OpenAI Response:', response.data.choices[0].text.trim());
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

testOpenAIKey();

