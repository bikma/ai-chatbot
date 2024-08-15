import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Tryat.ai!
        </h1>
        <p className="leading-normal text-muted-foreground">
        Tryat.ai connects service providers with those who need their services. The platform simplifies finding the right service or reaching the right audience.
        </p>
        <p className="leading-normal text-muted-foreground">
        Whether you are offering a service or looking for one, Tryat.ai makes it easy and efficient.
        </p>
      </div>
    </div>
  )
}
