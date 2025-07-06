'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { usePostContext } from '@/components/posts/provider'

export const PostDetails = () => {
  const { selectedPost, openSheet, setOpenSheet } = usePostContext()

  return (
    <Sheet modal={false} open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent
        side="right"
        className="w-[400px] border-l bg-primary-dark shadow-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="text-muted-foreground">
            {selectedPost?.properties.title}
          </SheetTitle>
          {/* <SheetDescription className="text-sm text-muted-foreground">
            {post.location} • Posted by {dummyPost.postedBy} on{' '}
            {dummyPost.date}
          </SheetDescription> */}
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <p>{selectedPost?.properties.description}</p>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setOpenSheet(false)}>
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
