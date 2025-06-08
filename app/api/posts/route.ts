import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import dbConnect from '@/lib/mongodb'
import Post, { IPost } from '@/models/Post'
import { LOGGER } from '@/lib/utils'
import { Feature, FeatureCollection, Point } from 'geojson'

const LOG = LOGGER()

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect()

  try {
    const posts = await Post.find({})
    const geoJson = transformIPostsToGeoJSON(posts)

    return new Response(JSON.stringify(geoJson), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    const err = e as Error
    LOG.error({
      tags: '[POSTS] [GET]',
      message: 'Failed to get posts.',
      path: '/api/posts',
      error: err,
      body: JSON.stringify(req.body),
    })

    return new Response(
      JSON.stringify({ error: 'Error fetching data', details: e }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}

const transformIPostsToGeoJSON = (
  posts: IPost[],
): FeatureCollection<Point, IPost> => {
  const features: Feature<Point, IPost>[] = posts
    .map((post) => {
      if (
        !post.location ||
        typeof post.location.longitude !== 'number' ||
        typeof post.location.latitude !== 'number'
      ) {
        console.warn('Post with invalid location:', post.id)
        return null
      }
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [post.location.longitude, post.location.latitude],
        },
        properties: post
      }
    })
    .filter((feature) => feature !== null) as Feature<Point, IPost>[]

  return {
    type: 'FeatureCollection',
    features,
  }
}