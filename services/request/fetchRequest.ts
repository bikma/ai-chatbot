// services\request\fetchRequest.ts
import supabase from '../../lib/supabaseClient';

export async function fetchValidRequest(requestId: string) {
    const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .eq('id', requestId);

    if (error) throw new Error(`Error fetching request: ${error.message}`);
    
    if (isValidRequest(data[0])) {
        return data[0].prompt;
    } else {
        throw new Error('Invalid request');
    }
}

function isValidRequest(request: any): boolean {
    // Your validation logic here
    return true; // Placeholder
}
