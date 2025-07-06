'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { usePostContext } from '@/components/posts/provider'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react'

export const PostDetails = () => {
  const { selectedPost, openSheet, setOpenSheet } = usePostContext()

  if (!selectedPost) {
    return null
  }

  const { properties: post } = selectedPost
  const {
    title,
    description,
    media_urls,
    no_likes,
    no_comments,
    no_shares,
    tags,
    location,
    date_created,
  } = post

  return (
    <Sheet modal={false} open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent
        side="right"
        className="w-[400px] border-l bg-primary-dark shadow-lg text-muted-foreground"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="text-muted-foreground">{title}</SheetTitle>
          <SheetDescription className="flex items-center text-sm text-muted-foreground/80">
            <MapPin className="mr-1 h-4 w-4" />
            {location.placeName} •{' '}
            {new Date(date_created).toLocaleDateString()}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <p>{description}</p>

          {media_urls && media_urls.length > 0 && (
            <div className="space-y-2">
              {media_urls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`post media ${index + 1}`}
                  className="h-auto w-full rounded-lg"
                />
              ))}
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-around py-2">
            <div className="flex items-center space-x-1">
              <Heart className="h-5 w-5" />
              <span>{no_likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-5 w-5" />
              <span>{no_comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Share2 className="h-5 w-5" />
              <span>{no_shares}</span>
            </div>
          </div>

          {tags && tags.length > 0 && (
            <>
              <Separator />
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="absolute bottom-4 right-4">
          <Button variant="outline" onClick={() => setOpenSheet(false)}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}