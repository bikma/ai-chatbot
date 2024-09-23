// app\types\types.ts
// app/types/types.ts

export interface ServiceDataType {
  providerId: number
    name: string
    contact: string
    location: string
    servicesOffered: string[]
    prompt: string
    tags: string[]
}
export interface MapService {
    id: number
    type: string
    providers: number
    categories: string[]
    lat: number
    lng: number
  }
  
export interface TextService {
    id: number
    type: string
    providers: number
    categories: string[]
  }


