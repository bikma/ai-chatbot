// utils/openaiClient.js
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();


console.log('OpenAI API Key:', process.env.NEXT_PUBLIC_OPENAI_API_KEY);

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;

// Function to extract details from the prompt using OpenAI API
export const extractDetails = async (prompt) => {
    try {
      const response = await openai.createCompletion({
        model: 'gpt-3.5-turbo', // Make sure you're using an available model
        prompt: `Extract the name, phone number, service type, and location from the following prompt:\n\n"${prompt}"`,
        max_tokens: 150,
        temperature: 0.2,
      });
  
      const result = response.data.choices[0].text.trim();
      return result;
    } catch (error) {
      console.error("Error extracting details:", error.message);
      return {
        name: "Unknown",
        contact: "Unknown",
        service_type: "Unknown",
        location: "Unknown",
      };
    }
  };


