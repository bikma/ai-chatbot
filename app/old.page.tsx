import { type Metadata } from 'next'
import Image from 'next/image'

export default async function Home() {
  return (
    <div className="flex items-center justify-center pt-16">
      {/* Left side: Text content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl mb-4 font-bold">
          Generative on-demand service
        </h1>
        <p>
          Discover the ease of tryat.ai on-demand services, where help is
          just a message away. Whether you are looking for a last-minute
          cleaner to tidy up your home, a reliable electrician to fix that
          faulty wiring, a dog walker for your pet, or even a yoga instructor
          for a private session, tryat.ai connects you with trusted
          professionals in real-time. Simply send a request via WhatsApp, and
          we will instantly match you with nearby experts, making your life
          easier with fast, efficient, and personalized service. Whatever you
          need, tryat.ai delivers – anytime, anywhere!
        </p>
      </div>

      {/* Right side: Image */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/tryat-main.png"
          alt="tryat"
          width={600}
          height={400}
          className="object-contain"
        />
      </div>
    </div>
  )
}
