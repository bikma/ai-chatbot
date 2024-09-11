// components\dashboard\MapComponent.tsx

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L from 'leaflet'
import 'leaflet.markercluster'
import { useEffect, useState } from 'react'
import { MapService } from '@/app/types/types'

interface MapComponentProps {
  services: MapService[]
}

// Component to handle dynamic panning
const MapUpdater: React.FC<{ searchCoords: [number, number] | null }> = ({
  searchCoords
}) => {
  const map = useMap()

  useEffect(() => {
    if (searchCoords) {
      map.flyTo(searchCoords, 13) // Smooth pan to the new location
    }
  }, [searchCoords, map])

  return null
}

const MapComponent: React.FC<MapComponentProps> = ({ services }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchCoords, setSearchCoords] = useState<[number, number] | null>(
    null
  )

  const handleSearch = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json`
    )
    const data = await response.json()
    if (data && data.length > 0) {
      const { lat, lon } = data[0]
      console.log(lat, lon)
      setSearchCoords([parseFloat(lat), parseFloat(lon)])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch() // Trigger search when Enter is pressed
    }
  }

  // Create custom Leaflet marker icon
  const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  return (
    <div>
      <div className="search-bar mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Enter a location..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key press
        />
        <button
          className="p-2 bg-blue-500 text-white mt-2"
          onClick={handleSearch}
        >
          Search Location
        </button>
      </div>

      {/* The MapContainer component from react-leaflet */}
      <MapContainer
        center={searchCoords || [51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater searchCoords={searchCoords} />

        {services.map(service => (
          <Marker
            key={service.id}
            position={[service.lat, service.lng]}
            icon={icon}
          >
            <Popup>
              {service.type} - {service.providers} providers
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapComponent
