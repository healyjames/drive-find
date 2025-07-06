'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { IPost } from '@/models/Post'
import { Feature, FeatureCollection, Point } from 'geojson'

type PostContextType = {
  posts: FeatureCollection<Point, IPost> | null
  loading: boolean
  error: boolean
  open: boolean
  setOpen: (o: boolean) => void
  selectedPost: Feature<Point, IPost> | null
  setSelectedPost: (p: Feature<Point, IPost> | null) => void
}
const PostContext = createContext<PostContextType | undefined>(undefined)

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<FeatureCollection<Point, IPost> | null>(
    null,
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Feature<
    Point,
    IPost
  > | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) {
          throw new Error(
            'Network response fetching from /api/posts was not ok.',
          )
        }

        const results = await response.json()
        setPosts(results)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        open,
        setOpen,
        selectedPost,
        setSelectedPost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider')
  }
  return context
}
