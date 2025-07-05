'use client'

import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps'
import { AlertCircle } from 'lucide-react'

import React, { useEffect, useState } from 'react'

import { ClusteredMarkers } from './cluster'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { IPost } from '@/models/Post'
import { FeatureCollection, Point } from 'geojson'
import LoadingSpinner from '../loading/spinner'

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API
const MAP_ID: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID

const mapDefaults = {
  coordinates: {
    lat: 53.18136494812854,
    lng: -2.6165447846574437,
  },
  options: {
    zoomControl: false,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    keyboardShortcuts: false,
  },
  style: {
    width: '100%',
    height: '100vh',
  },
  zoom: 14,
}

export const Map = () => {
  const [lat, setLat] = useState<number>(mapDefaults.coordinates.lat)
  const [lng, setLng] = useState<number>(mapDefaults.coordinates.lng)
  const [posts, setPosts] = useState<FeatureCollection<Point, IPost> | null>(null)
  const [numClusters, setNumClusters] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

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
        if (!results || results.length < 1) {
          console.log('no results')
        }

        setPosts(results)
        setLoading(false)
      } catch (error) {
        setError(true)
        console.error(error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    setLat(Number(queryParams.get('lat')))
    setLng(Number(queryParams.get('lng')))
  }, [])

  return (
    <React.Fragment>
      <APIProvider apiKey={API_KEY}>
        <GoogleMap
          mapId={MAP_ID}
          style={{ width: '100vw', height: 'calc(100vh - 80px)' }}
          defaultCenter={{
            lat: lat,
            lng: lng,
          }}
          defaultZoom={mapDefaults.zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {loading && !error ? (
            <LoadingSpinner />
          ) : (
            posts && (
              <ClusteredMarkers
                geojson={posts}
                setNumClusters={setNumClusters}
              />
            )
          )}

          {error && <MapErrorAlert />}
        </GoogleMap>
      </APIProvider>
    </React.Fragment>
  )
}

const MapErrorAlert = () => {
  return (
    <div className="fixed top-0 left-0 z-100 p-2 h-screen w-screen flex flex-row justify-center items-center bg-white bg-opacity-60">
      <Alert variant="destructive" className="w-64 bg-white">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load map data. Please try again later.
        </AlertDescription>
      </Alert>
    </div>
  )
}
