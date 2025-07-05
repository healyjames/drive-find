'use client'

import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps'
import { AlertCircle } from 'lucide-react'
import React, { useState } from 'react'

import { usePostContext } from '@/components/posts/provider'
import { ClusteredMarkers } from './cluster'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import LoadingSpinner from '../loading/spinner'

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string
const MAP_ID: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string

const mapDefaults = {
  coordinates: { lat: 53.18136494812854, lng: -2.6165447846574437 },
  options: {
    zoomControl: false,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    keyboardShortcuts: false,
  },
  style: { width: '100%', height: 'calc(100vh - 80px)' },
  zoom: 14,
}

export const Map = () => {
  const { posts, loading, error } = usePostContext()
  const [numClusters, setNumClusters] = useState(0)

  return (
    <APIProvider apiKey={API_KEY}>
      <GoogleMap
        mapId={MAP_ID}
        style={mapDefaults.style}
        defaultCenter={mapDefaults.coordinates}
        defaultZoom={mapDefaults.zoom}
        gestureHandling="greedy"
        disableDefaultUI
      >
        {loading && !error ? (
          <LoadingSpinner />
        ) : (
          posts && (
            <ClusteredMarkers geojson={posts} setNumClusters={setNumClusters} />
          )
        )}

        {error && <MapErrorAlert />}
      </GoogleMap>
    </APIProvider>
  )
}

const MapErrorAlert = () => (
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
