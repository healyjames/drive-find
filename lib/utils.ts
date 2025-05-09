import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface LOG {
  tags: string
  path?: string
  message: string
  error?: Error
  body?: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const LOGGER = () => {
  const date = new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  return {
    error: ({ tags, path, message, error, body }: LOG) => {
      console.log(`${date} | ${tags} [ERROR]: ${message}`)
      console.log({
        timestamp: date,
        message: message,
        path: path,
        body: JSON.stringify(body) || 'unknown',
        error: error?.stack,
      })
    },
    success: ({ tags, message }: LOG) => {
      console.log(`${date} | ${tags} [SUCCESS]: ${message}`)
    },
  }
}
