import React from 'react'
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { Feature, Point } from 'geojson'
import { IPost } from '@/models/Post'

type TreeMarkerProps = {
  position: google.maps.LatLngLiteral
  feature: Feature<Point, IPost>
}

export const FeatureMarker = ({ position }: TreeMarkerProps) => {
  const [markerRef] = useAdvancedMarkerRef()

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
      >
        <div className="z-10 relative w-8 h-8 bg-secondary-base rounded-full border-[3px] border-white shadow-md transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"></div>
        <div className="h-4 w-full bg-[#000] rounded-[50%] opacity-20 -mt-1"></div>
      </AdvancedMarker>
    </>
  )
}
