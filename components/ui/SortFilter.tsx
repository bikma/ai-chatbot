import React from 'react'

interface SortFilterProps {
  sortOption: string
  setSortOption: (option: string) => void
}

const SortFilter: React.FC<SortFilterProps> = ({
  sortOption,
  setSortOption
}) => {
  return (
    <div className="flex mb-4">
      <label htmlFor="sort-options" className="mr-2">
        Sort by:
      </label>
      <select
        id="sort-options"
        value={sortOption}
        onChange={e => setSortOption(e.target.value)}
        className="border p-2"
      >
        <option value="proximity">Proximity</option>
        <option value="provider_count">Provider Count</option>
      </select>
    </div>
  )
}

export default SortFilter
