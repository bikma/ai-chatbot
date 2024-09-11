// app/types/types.ts

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