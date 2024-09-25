import openai from '../../lib/openAiClient';

export async function extractDetailsFromPrompt(prompt: string) {
    // const response = await openai.chat.completions.create({
    //     model: 'gpt-4o-mini',
    //     messages: [
    //         { role: 'system', content: 'You are an assistant that extracts details from prompts and returns them in JSON format.' },
    //         { 
    //             role: 'user', 
    //             content: `
    //                 Review the provided prompt and return the following details as a JSON object:
    //                 {
    //                     "status": "(Complete if all of Phone Number, Location, and Service Type are provided; otherwise, Incomplete)"
    //                     "phone_number": "(Extract only one phone number if there are multiple. Format with the country code in parentheses, e.g., (+91) 9177190001)"
    //                     "location": "(Extract the location)",
    //                     "service_type": "(Extract the service type)",
    //                     "synonyms": ["(Provide at least 3 synonyms for the service type)"],
    //                     "tags": ["(Provide at least 3 tags related to the service type)"],
    //                     "prompt_rephrasing": "(Rephrase the original prompt if necessary; otherwise, return the original prompt)",
    //                     "follow_up_chat": "(If status is Incomplete, ask the user for the missing information; otherwise, say N/A)"
    //                 }
    //                 Prompt: ${prompt}
    //             `
    //         }
    //     ],
    // });


    // const response = await openai.chat.completions.create({
    //     model: 'gpt-4o-mini',
    //     messages: [
    //         { role: 'system', content: 'You are an assistant that extracts structured details from prompts and returns them in JSON format.' },
    //         { 
    //             role: 'user', 
    //             content: `
    //                 Review the provided prompt and return the following details as a JSON object:
    //                 {
    //                     "status": "(Complete if all of Phone Number, Location, and Service Type are provided; otherwise, Incomplete)",
    //                     "phone_number": "(Extract only one phone number if there are multiple. Format with the country code in parentheses, e.g., (+91) 9177190001)",
    //                     "location": "(Extract the location in city, state format 'if' available)",
    //                     "service_type": "(Extract the service type, ensuring it is ethical and legal. If ambiguous, return the most common interpretation.)",
    //                     "synonyms": ["(Provide up to 3 synonyms for the service type. If none are available, return an empty array.)"],
    //                     "tags": ["(Provide up to 3 tags related to the service type. If none are available, return an empty array.)"],
    //                     "original_prompt": "original prompt whithout any changes"
    //                     "prompt_rephrasing": "(Rephrase the original prompt if necessary for better clarity; otherwise, return the original prompt)",
    //                     "follow_up_chat": "(If status is Incomplete, specify what information is missing. Otherwise, return 'N/A')"
    //                 }
    //                 Example:
    //                 Input: "Math and Science tutor for high school students available in Kukatpally. Reach out at +918755432876 by Sivakumar"
    //                 Output:
    //                 {
    //                     "status": "Complete",
    //                     "phone_number": "(+91) 8755432876",
    //                     "location": "Kukatpally, Hyderabad",
    //                     "service_type": "Tutor",
    //                     "synonyms": ["Math tutor", "Science tutor", "High school educator"],
    //                     "tags": ["Education", "Tutoring", "High school"],
    //                     "original_prompt": "Math and Science tutor for high school students available in Kukatpally. Reach out at +918755432876 by Sivakumar"
    //                     "prompt_rephrasing": "My name is Sivakumar, I am a Math and Science tutor for high school students in Kukatpally. Reach out to me at (+91) 8755432876",
    //                     "follow_up_chat": "N/A"
    //                 }
    //                 Prompt: ${prompt}
    //             `
    //         }
    //     ],
    // });
    

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { 
                
                role: 'system', content: `You are an assistant that extracts structured details from prompts and returns them in JSON format.
                Please ensure the service type is legal. If the service is illegal or unethical, set the status to 'Incomplete.' also ensure there is relavant followup chat
                Review the provided prompt and return the following details as a JSON object:
                    {
                        "status": "(Complete if at least one location such as a neighborhood or city is provided, even if state or country is missing. Try to enrich smaller locations with city or region when possible)",
                        "phone_number": "(Extract only one phone number if there are multiple. Format with the country code in parentheses, e.g., (+91) 9177190001)",
                        "location": "(Extract the location. Accept smaller areas such as neighborhoods as complete. If possible, enrich the location with the city it belongs to, e.g., Kukatpally -> Hyderabad). if possible extract the location if pin code or zip code is provided",
                        "service_type": "(Extract the service type, ensuring it is ethical and legal. If ambiguous, return the most common interpretation.)",
                        "synonyms": ["(Provide up to 3 synonyms for the service type. If none are available, return an empty array.)"],
                        "tags": ["(Provide up to 3 tags related to the service type. If none are available, return an empty array.)"],
                        "prompt_rephrasing": "(Rephrase the original prompt if necessary for better clarity; otherwise, return the original prompt)",
                        "follow_up_chat": "(If status is Incomplete, specify what information is missing. Otherwise, return 'N/A')"
                        "prompt_quality": "(Evaluate the prompt quality as a percentage, based on completeness, 
                        clarity, and relevance to match the user's request with the provider's prompt. 
                        A high score indicates that the prompt includes essential details like location, service type, and other specifics, 
                        making it easier to match accurately. Consider missing information, ambiguity, or unclear phrasing when assigning a lower score, It can be 0 rather undefined.)"
                    }
                    Example 1:
                    Input: "Math and Science tutor for high school students available in Kukatpally. Reach out at +918755432876 by Sivakumar"
                    Output:
                    {
                        "status": "Complete",
                        "phone_number": "(+91) 8755432876",
                        "location": "Kukatpally, Hyderabad",
                        "service_type": "Tutor",
                        "synonyms": ["Math tutor", "Science tutor", "High school educator"],
                        "tags": ["Education", "Tutoring", "High school"],
                        "prompt_rephrasing": "I am a Math and Science tutor for high school students in Kukatpally. Reach out to me at (+91) 8755432876 by Sivakumar.",
                        "follow_up_chat": "N/A"
                    }
                    Example 2:
                    Input: "Math and Science tutor for high school students available in zip code 43035. Reach out at 8755432876 by Sivakumar"
                    Output:
                    {
                        "status": "Complete",
                        "phone_number": "(+1) 8755432876",
                        "location": "Lewis Center, OH 43035",
                        "service_type": "Tutor",
                        "synonyms": ["Math tutor", "Science tutor", "High school educator"],
                        "tags": ["Education", "Tutoring", "High school"],
                        "prompt_rephrasing": "I am a Math and Science tutor for high school students in Kukatpally. Reach out to me at (+1) 8755432876 by Sivakumar.",
                        "follow_up_chat": "N/A"
                    }
            ` },
            { 
                role: 'user', 
                content: `                    
                    Prompt: ${prompt}
                `
        

            }
        ],
    });
    
    
    const messageContent = response.choices[0].message?.content ?? '';
    console.log("Message Content:\n", messageContent)
    console.log("\nUsage:\n", response.usage)


    if (messageContent) {
        // Parse the content only if it's a valid string
        const cleanedContent = messageContent.replace(/```json|```/g, '').trim();
        const { status, phone_number, location, service_type, synonyms, tags, prompt_rephrasing, follow_up_chat,prompt_quality } = JSON.parse(cleanedContent);
    
        console.log(status);  // "Complete"
        console.log(phone_number);  // "(+91) 8755432876"
        console.log(location);  // "Kukatpally"
        console.log(service_type);  // "Tutor"
        console.log(synonyms);  // ["Educator", "Instructor", "Teacher"]
        console.log(tags);  // ["#Education", "#Tutoring", "#HighSchool"]
        console.log(prompt_rephrasing);  // "Math and Science tutor for high school students available in Kukatpally..."
        console.log(follow_up_chat);  // "N/A"
        console.log(prompt_quality);  // "N/A"
        return { status, phone_number, location, service_type, synonyms, tags, prompt_rephrasing, follow_up_chat }
    } else {
        console.error("Message content is null or empty");
    }
    
    
}

