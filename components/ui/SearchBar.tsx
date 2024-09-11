// components\ui\SearchBar.tsx
'use client'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void // Specify the type for onSearch prop
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query) // Passing the query to the parent
  }

  return (
    <input
      type="text"
      placeholder="Search for a service type..."
      value={searchQuery}
      onChange={handleInputChange}
      className="border border-gray-300 p-2 rounded w-full mb-4"
    />
  )
}
