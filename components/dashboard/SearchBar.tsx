// components\ui\SearchBar.tsx
import React, { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchTerm(query)

    // Start filtering from the third character
    if (query.length >= 3) {
      onSearch(query)
    } else {
      onSearch('') // Clear the search if less than 3 characters
    }
  }

  return (
    <input
      type="text"
      className="search-bar w-full p-2 border rounded"
      placeholder="Search by service type or location..."
      value={searchTerm}
      onChange={handleSearch}
    />
  )
}

export default SearchBar
