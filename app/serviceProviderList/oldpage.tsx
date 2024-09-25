// app\serviceProviderList\oldpage.tsx
// app\serviceProviderList\page.tsx
// app/serviceProviderList/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { extractDetails } from '@/utils/openaiClient' // Import the OpenAI helper function
import { fetchProvidersFromSupabase } from '@/utils/supabaseClient' // Assuming you're fetching providers from Supabase

interface Provider {
  id: number
  prompt: string
  name: string
  contact: string
  service_type: string
  location: string
}

const ServiceProviderList = () => {
  const [providers, setProviders] = useState<Provider[]>([])

  // Fetch providers and extract details from prompt
  useEffect(() => {
    const fetchProviders = async () => {
      // Fetch providers from Supabase (or any backend you're using)
      const fetchedProviders = await fetchProvidersFromSupabase() // Make sure you have this function implemented to fetch from your database

      // Process each provider's prompt using OpenAI API
      const processedProviders = await Promise.all(
        fetchedProviders.map(async provider => {
          // Extract details (name, contact, service_type, location) from the provider's prompt
          const details = await extractDetails(provider.prompt)
          return {
            ...provider,
            ...details // Merge extracted details with the provider data
          }
        })
      )

      setProviders(processedProviders)
    }

    fetchProviders()
  }, [])

  return (
    <div>
      <h1>Service Providers</h1>
      <ul>
        {providers.map(provider => (
          <li key={provider.id}>
            <strong>Name:</strong> {provider.name} <br />
            <strong>Contact:</strong> {provider.contact} <br />
            <strong>Service Type:</strong> {provider.service_type} <br />
            <strong>Location:</strong> {provider.location} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ServiceProviderList
