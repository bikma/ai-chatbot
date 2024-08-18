'use client'

import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { spinner } from './spinner'
import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from '../markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import { FaLocationDot, FaPhone, FaUser } from 'react-icons/fa6'
import {
  MdEmail,
  MdOutlineAccessTimeFilled,
  MdInfo
} from 'react-icons/md'

// Different types of message bubbles.,

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <IconUser />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
        {children}
      </div>
    </div>
  )
}

export function BotMessage({
  content,
  className
}: {
  content: string | StreamableValue<string>
  className?: string
}) {
  const text = useStreamableText(content)
  let serviceData = null
  try {
    const data = JSON.parse(content)
    serviceData = data[0].details
  } catch (error) {
    console.log('Error', error)
  }

  return (
    <div className={cn('group relative flex items-start md:-ml-12', className)}>
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {/* <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {text}
        </MemoizedReactMarkdown> */}
        <div className="bg-white p-3 rounded-lg shadow-lg  w-full">
          {serviceData.classification && (
            <div className="mb-1 flex items-center">
              <div className="mr-4">
                <FaUser />
              </div>
              <h2 className="text-xl font-bold flex items-center">
                {serviceData.name ? serviceData.name : "ANKAIAH BIKKI"}
              </h2>
            </div>
          )}
          {serviceData.service_type && (
            <div className="mb-4 ml-8 flex items-center">
              <div>
                <p className="text-gray-700">Service Type : {serviceData.service_type}</p>
              </div>
            </div>
          )}

          {serviceData.location_area && <div className="mb-4 flex items-center">
            <div className="mr-4">
              <FaLocationDot />
            </div>
            <div>
              <p className="text-gray-700">
                {serviceData.location_area}, {serviceData.location_nearby}{' '}
              </p>
            </div>
          </div>}

          {serviceData.contact_mobile && <div className="mb-4 flex items-center">
            <div className="mr-4">
              <FaPhone />
            </div>
            <div>
              <p className="text-gray-700">{serviceData.contact_mobile}</p>
            </div>
          </div>}

          {serviceData.contact_email && <div className="mb-4 flex items-center">
            <div className="mr-4">
              <MdEmail />
            </div>
            <div>
              <p className="text-gray-700">{serviceData.contact_email}</p>
            </div>
          </div>}

          {serviceData.date_time && <div className="mb-4 flex items-center">
            <div className="mr-4">
              <MdOutlineAccessTimeFilled />
            </div>
            <div>
              <p className="text-gray-700">{serviceData.date_time}</p>
            </div>
          </div>}

          {(serviceData.Specific || serviceData.Others)&& <div className="flex items-center">
            <div className="mr-4">
              <MdInfo />
            </div>
            <div>
              <p className="text-gray-700">{serviceData.Specific}</p>
              <p className="text-gray-700">{serviceData.Others}</p>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export function BotCard({
  children,
  showAvatar = true
}: {
  children: React.ReactNode
  showAvatar?: boolean
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm',
          !showAvatar && 'invisible'
        )}
      >
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  )
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial p-2'}>{children}</div>
    </div>
  )
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconOpenAI />
      </div>
      <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  )
}
