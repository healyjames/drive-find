'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export const PostDetails = () => {
  const [open, setOpen] = useState(true)

  const dummyPost = {
    title: 'Beautiful Countryside Cabin',
    description:
      'A cozy and remote cabin surrounded by trees and nature. Ideal for writers, artists, or anyone seeking inspiration.',
    location: 'Snowdonia, Wales',
    date: 'July 4, 2025',
    postedBy: 'Jane Doe',
  }

  return (
    <Sheet modal={false} open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-[400px] border-l bg-primary-dark shadow-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="text-muted-foreground">
            {dummyPost.title}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {dummyPost.location} • Posted by {dummyPost.postedBy} on{' '}
            {dummyPost.date}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <p>{dummyPost.description}</p>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
