import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const year = React.useMemo(() => new Date().getFullYear(), [])
  return (
    <div
      className={cn(
        'sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl',
        className
      )}
      {...props}
    >
      <span>Bikmasoft © {year}</span>
      <div className="gap-1">
        <button className="bg-gray-100 text-black py-1 px-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 mr-4">
          <ExternalLink href="/privacy-policy">Privacy Policy</ExternalLink>
        </button>
        <button className="bg-gray-100 text-black py-1 px-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50">
          <ExternalLink href="/terms-of-services">
            Terms of Service
          </ExternalLink>
        </button>
      </div>
    </div>
  )
}
