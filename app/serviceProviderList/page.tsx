// app\serviceProviderList\page.tsx
'use client'

import supabase from '@/lib/supabaseClient'
import { useState } from 'react'

export default function ServiceProviderList() {
  const [prompt, setPrompt] = useState('')
  const [extractedDetails, setExtractedDetails] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [promptId, setPromptId] = useState('')

  const handleExtractDetails = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/extractDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      })

      const data = await response.json()

      if (response.ok) {
        setExtractedDetails(data.extractedDetails)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Failed to fetch the details')
    } finally {
      setLoading(false)
    }
  }

  // Function to fetch the prompt from Supabase
  const handleFetchPromptFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('service_providers') // Replace 'prompts' with the actual table name
        .select('prompt') // Assuming the column storing the prompt is called 'prompt'
        .eq('id', promptId) // Use the entered ID for filtering
        .single() // Expect a single result

      if (error) {
        console.error('Error fetching prompt from Supabase:', error.message)
        setError('Failed to fetch prompt from Supabase')
      } else if (data) {
        setPrompt(data.prompt)
      }
    } catch (error) {
      console.error('Error fetching prompt:', error)
      setError('An error occurred while fetching prompt')
    }
  }

  const handleAddToSupabase = async () => {
    console.log('Attempting to update with id:', promptId)
    if (promptId) {
      // Update existing record
      try {
        const { data, error } = await supabase
          .from('service_providers')
          .update({
            phone_number: extractedDetails.phone_number,
            location: extractedDetails.location,
            service_type: extractedDetails.service_type,
            synonyms: extractedDetails.synonyms.join(', '), // Convert array to comma-separated string
            tags: extractedDetails.tags.join(', '), // Convert array to comma-separated string
            prompt: extractedDetails.prompt_rephrasing
          })
          .eq('id', promptId) // Match by the existing id

        if (error) {
          console.error('Error updating Supabase:', error.message)
          alert('Failed to update the service in Supabase')
        } else {
          alert('Service successfully updated in Supabase')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('An error occurred while updating Supabase')
      }
    } else {
      // Insert a new record
      try {
        const { data, error } = await supabase
          .from('service_providers')
          .insert([
            {
              phone_number: extractedDetails.phone_number,
              location: extractedDetails.location,
              service_type: extractedDetails.service_type,
              synonyms: extractedDetails.synonyms.join(', '), // Convert array to comma-separated string
              tags: extractedDetails.tags.join(', '), // Convert array to comma-separated string
              prompt: extractedDetails.prompt_rephrasing
            }
          ])

        if (error) {
          console.error('Error adding to Supabase:', error.message)
          alert('Failed to add the service to Supabase')
        } else {
          alert('Service successfully added to Supabase')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('An error occurred while adding to Supabase')
      }
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div>
        <label
          htmlFor="prompt"
          style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}
        >
          Enter Service Provider Prompt:
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={e => {
            setPrompt(e.target.value)
            // Clear promptId if textarea is emptied
            if (e.target.value.trim() === '') {
              setPromptId('')
            }
          }}
          rows={5}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        {/* Input field for entering the ID */}
        <input
          type="text"
          placeholder="Enter ID"
          value={promptId}
          onChange={e => setPromptId(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button
            onClick={handleFetchPromptFromSupabase}
            style={{
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '4px',
              marginTop: '10px'
            }}
          >
            Get Prompt from Supabase
          </button>
          <button
            onClick={handleExtractDetails}
            disabled={loading}
            style={{
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '4px',
              marginTop: '10px'
            }}
          >
            {loading ? 'Processing...' : 'Extract Details'}
          </button>
        </div>
      </div>

      {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}

      {extractedDetails && (
        <div style={{ marginTop: '20px' }}>
          <h2>Extracted Details:</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <strong>Status:</strong>
              <span
                style={{
                  color:
                    extractedDetails.status === 'Complete' ? 'green' : 'red',
                  marginLeft: '5px'
                }}
              >
                {extractedDetails.status}
              </span>
            </li>
            <li>
              <strong>Phone Number:</strong> {extractedDetails.phone_number}
            </li>
            <li>
              <strong>Location:</strong> {extractedDetails.location}
            </li>
            <li>
              <strong>Service Type:</strong> {extractedDetails.service_type}
            </li>
            <li>
              <strong>Synonyms:</strong> {extractedDetails.synonyms.join(', ')}
            </li>
            <li>
              <strong>Tags:</strong> {extractedDetails.tags.join(', ')}
            </li>
            <li>
              <strong>Prompt:</strong> {extractedDetails.prompt_rephrasing}
            </li>
            <li>
              Follow-up Chat:
              <span
                style={{
                  color:
                    extractedDetails.follow_up_chat === 'N/A' ? 'green' : 'red'
                }}
              >
                {extractedDetails.follow_up_chat}
              </span>
            </li>
          </ul>
          {extractedDetails.status === 'Complete' && (
            <button
              onClick={handleAddToSupabase}
              style={{
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '4px',
                marginTop: '10px'
              }}
            >
              Add to Supabase
            </button>
          )}
        </div>
      )}
    </div>
  )
}
