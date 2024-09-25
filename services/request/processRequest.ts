// services\request\processRequest.ts
import { fetchValidRequest } from './fetchRequest';
import { extractDetailsFromPrompt } from '../openai/extractDetails';
import { storeExtractedData } from './storeExtractedData';

export async function processServiceRequest(requestId: string) {
    try {
        const prompt = await fetchValidRequest(requestId);
        const extractedData = await extractDetailsFromPrompt(prompt);
        await storeExtractedData(requestId, extractedData);
        console.log('Request processed successfully!');
    } catch (error) {
        console.error(error);
    }
}
