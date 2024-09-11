// components/dashboard/ServiceGrid.tsx

import { TextService } from '@/app/types/types'

interface ServiceGridProps {
  services: TextService[] // Accept services prop
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <div className="services-grid grid grid-cols-3 gap-4">
      {services.map(service => (
        <div
          key={service.id}
          className="service-tile p-4 border rounded-lg shadow"
        >
          <h3 className="font-bold">
            {service.type} ({service.providers} providers)
          </h3>
          <ul>
            {service.categories.map((category, index) => (
              <li key={index} className="text-sm text-gray-600">
                • {category}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default ServiceGrid
