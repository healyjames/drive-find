// components/Map.tsx
'use client'

import { usePosts } from '@/hooks/use-post'
import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps'
import { ClusteredMarkers } from './cluster'
import LoadingSpinner from '../loading/spinner'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const mapDefaults = {
  coordinates: { lat: 53.1813, lng: -2.6165 },
  style: { width: '100%', height: 'calc(100vh - 80px)' },
  zoom: 14,
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API!
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!

export const Map = () => {
  const { posts, loading, error } = usePosts()

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
        {loading && !error && <LoadingSpinner />}
        {error && <MapErrorAlert />}
        {posts && (
          <ClusteredMarkers geojson={posts} setNumClusters={() => {}} />
        )}
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
