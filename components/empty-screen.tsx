import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">Welcome to the <b>Tryat.ai</b> playground!</h1>
        <p className="leading-normal text-muted-foreground">
          The Tryat.ai platform simplifies finding the right service or reaching
          the right audience. Whether you’re offering a service or looking for
          one, Tryat.ai ensures a smooth, efficient, and effective experience
          for both sides.
        </p>
      </div>
    </div>
  )
}
