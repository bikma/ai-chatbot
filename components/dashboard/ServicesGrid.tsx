// components\dashboard\ServicesGrid.tsx
// components/dashboard/ServiceGrid.tsx

import { ServiceDataType } from '@/app/types/types'

interface ServiceGridProps {
  services: ServiceDataType[] // Accept services prop
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <div className="services-grid grid grid-cols-3 gap-4">
      {services.map(service => (
        <div
          key={service.providerId}
          className="service-tile p-4 border rounded-lg shadow"
        >
          <h3 className="font-bold">
            {service.name} ({service.contact}) - {service.location}
          </h3>
          <ul>
            {service.servicesOffered.map((s, index) => (
              <li key={index} className="text-sm text-gray-600">
                • {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default ServiceGrid
