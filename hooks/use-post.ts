'use client'

import { useEffect, useState } from 'react'
import { IPost } from '@/models/Post'
import { FeatureCollection, Point } from 'geojson'

type UsePostsResult = {
  posts: FeatureCollection<Point, IPost> | null
  loading: boolean
  error: boolean
}

export const usePosts = (): UsePostsResult => {
  const [posts, setPosts] = useState<FeatureCollection<Point, IPost> | null>(
    null,
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/posts')
        if (!res.ok) throw new Error('Failed to fetch posts')
        const data = await res.json()
        setPosts(data)
      } catch (e) {
        console.error(e)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}
