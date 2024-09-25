// app\api\extractDetails\route.ts
import { NextResponse } from 'next/server';
import { extractDetailsFromPrompt } from '@/services/openai/extractDetails';  // Adjust path as necessary

export async function POST(req: Request) {
    const { prompt } = await req.json();  // Extract the prompt from the request body

    if (!prompt) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    try {
        const extractedDetails = await extractDetailsFromPrompt(prompt);
        return NextResponse.json({ extractedDetails });
    } catch (error) {
        // Assert the error type to access the message property
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
        }
    }
}


