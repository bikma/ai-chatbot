// components\header.tsx
import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'

async function UserOrLogin() {
  const session = (await auth()) as Session
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          {/* <IconNextChat className="size-6 mr-2 dark:hidden" inverted /> */}
          <IconNextChat className="hidden size-6 mr-2 dark:block" />
        </Link>
      )}
      {/* <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div> */}
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end space-x-8">
        <a
          href="/"
          rel="noopener noreferrer"
          // className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <span className="hidden ml-2 md:flex">Home</span>
        </a>
        <a
          href="/dashboard"
          rel="noopener noreferrer"
          // className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <span className="hidden ml-2 md:flex">Dashboard</span>
        </a>
        <a
          href="/serviceProviderList"
          rel="noopener noreferrer"
          // className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <span className="hidden ml-2 md:flex">Provider List</span>
        </a>
        <a
          href="/howto"
          rel="noopener noreferrer"
          // className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <span className="hidden ml-2 md:flex">How to</span>
        </a>
        <a
          href="/contact"
          rel="noopener noreferrer"
          // className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <span className="hidden ml-2 md:flex">Contact</span>
        </a>
      </div>
    </header>
  )
}
