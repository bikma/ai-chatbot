// app\dashboard\page.tsx
// app/dashboard/page.tsx

'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/dashboard/SearchBar'
import ServicesGrid from '@/components/dashboard/ServicesGrid'
import SortFilter from '@/components/ui/SortFilter'
import { ServicesData } from '@/app/data/serviceProviderData'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('provider')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredServices, setFilteredServices] = useState(ServicesData)
  const [sortOption, setSortOption] = useState('proximity')

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredServices(ServicesData) // Show all services if no search query
    } else {
      const filtered = ServicesData.filter(
        service =>
          service.servicesOffered.some(serviceType =>
            serviceType.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          service.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.tags.some(tag =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          service.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredServices(filtered)
    }
  }, [searchQuery])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'provider':
        return (
          <>
            <SearchBar onSearch={(query: string) => setSearchQuery(query)} />
            <SortFilter sortOption={sortOption} setSortOption={setSortOption} />
            <ServicesGrid services={filteredServices} />
          </>
        )
      case 'requester':
        return (
          // add request dashboard
          <>
            <h1>hello</h1>
            <SearchBar onSearch={(query: string) => setSearchQuery(query)} />
            <SortFilter sortOption={sortOption} setSortOption={setSortOption} />
            <ServicesGrid services={filteredServices} />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="dashboard-container p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="tabs flex space-x-4 mb-6">
        <button
          className={`tab ${activeTab === 'provider' ? 'active' : ''}`}
          onClick={() => setActiveTab('provider')}
        >
          Service Provider
        </button>
        <button
          className={`tab ${activeTab === 'requester' ? 'active' : ''}`}
          onClick={() => setActiveTab('requester')}
        >
          Service Requester
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  )
}
