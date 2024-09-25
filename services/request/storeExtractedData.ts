// services\request\storeExtractedData.ts
import supabase from '../../lib/supabaseClient';

export async function storeExtractedData(requestId: string, extractedData: any) {
    const { error } = await supabase
        .from('service_requests')
        .update({
            phone_number: extractedData.phone,
            location: extractedData.location,
            service_type: extractedData.serviceType,
            synonyms: extractedData.synonyms,
            tags: extractedData.tags,
        })
        .eq('id', requestId);

    if (error) throw new Error(`Error updating request: ${error.message}`);
}
