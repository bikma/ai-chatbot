import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = e => {
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
