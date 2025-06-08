import React, { useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { Lilita_One } from 'next/font/google'

type TreeClusterMarkerProps = {
  clusterId: number
  onMarkerClick?: (
    marker: google.maps.marker.AdvancedMarkerElement,
    clusterId: number,
  ) => void
  position: google.maps.LatLngLiteral
  size: number
  sizeAsText: string
}

const lilitaOne = Lilita_One({
  subsets: ['latin'],
  weight: '400',
})

export const FeaturesClusterMarker = ({
  position,
  size,
  sizeAsText,
  onMarkerClick,
  clusterId,
}: TreeClusterMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const handleClick = useCallback(
    () => onMarkerClick && onMarkerClick(marker!, clusterId),
    [onMarkerClick, marker, clusterId],
  )

  return (
    <AdvancedMarker
      ref={markerRef}
      position={position}
      zIndex={size}
      onClick={handleClick}
      className={'marker cluster'}
      anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
    >
      <SizeBadge size={sizeAsText} />
    </AdvancedMarker>
  )
}

const SizeBadge = ({ size }: { size: string }) => {
  return (
    <div className="flex flex-col items-center">
      <strong>
        <p
          className={`${lilitaOne.className} text-[2rem] font-bold text-secondary-base [text-shadow:3px_3px_0_white,-3px_3px_0_white,3px_-3px_0_white,-3px_-3px_0_white,0_3px_0_white,3px_0_0_white,-3px_0_0_white]`}
        >
          {size}
        </p>
      </strong>
      <ChevronDown
        fill="#E8740C"
        className="w-4 h-4 text-secondary-base -mt-1"
      />
    </div>
  )
}