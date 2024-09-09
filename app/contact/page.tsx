import { type Metadata } from 'next'

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: {
//       default: 'tryat.ai - Generative On-Demand Services'
//     }
//   }
// }
export default async function Contact() {
  return (
    <div className="flex items-center justify-center mt-[300px]">
      <h1 className="text-2xl text-gray-500">Contact page</h1>
    </div>
  )
}
