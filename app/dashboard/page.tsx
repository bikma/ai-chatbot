// app\dashboard\page.tsx

'use client'
// some change
import { useState, useEffect } from 'react'
import SearchBar from '../../components/ui/SearchBar'
import ServicesGrid from '@/components/dashboard/ServicesGrid'
import SortFilter from '@/components/ui/SortFilter'
import MapComponent from '@/components/dashboard/MapComponent'
import { MapService, TextService } from '@/app/types/types'
import {
  MapServicesData,
  TextServicesData
} from '@/app/data/serviceProviderData'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('providerText')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredServices, setFilteredServices] = useState<TextService[]>([])
  const [mapServices, setMapServices] = useState<MapService[]>([])
  const [sortOption, setSortOption] = useState('proximity')
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This code will only run on the client side
      setWindowWidth(window.innerWidth)
    }
    // Filter services based on search query
    if (searchQuery === '') {
      setFilteredServices(TextServicesData) // Show all services if no search query
    } else {
      const filtered = TextServicesData.filter(service =>
        service.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredServices(filtered)
    }
  }, [searchQuery])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'providerText':
        return (
          <>
            <SearchBar onSearch={(query: string) => setSearchQuery(query)} />
            <SortFilter sortOption={sortOption} setSortOption={setSortOption} />
            <ServicesGrid services={filteredServices} />
          </>
        )
      case 'providerMap':
        return <MapComponent services={MapServicesData} />
      case 'requesterText':
        return <div>Service Requester Text View (Coming Soon)</div>
      case 'requesterMap':
        return <div>Service Requester Map View (Coming Soon)</div>
      default:
        return null
    }
  }

  return (
    <div className="dashboard-container p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="tabs flex space-x-4 mb-6">
        <button
          className={`tab ${activeTab === 'providerText' ? 'active' : ''}`}
          onClick={() => setActiveTab('providerText')}
        >
          Service Provider (Text)
        </button>
        <button
          className={`tab ${activeTab === 'providerMap' ? 'active' : ''}`}
          onClick={() => setActiveTab('providerMap')}
        >
          Service Provider (Map)
        </button>
        <button
          className={`tab ${activeTab === 'requesterText' ? 'active' : ''}`}
          onClick={() => setActiveTab('requesterText')}
        >
          Service Requester (Text)
        </button>
        <button
          className={`tab ${activeTab === 'requesterMap' ? 'active' : ''}`}
          onClick={() => setActiveTab('requesterMap')}
        >
          Service Requester (Map)
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  )
}
