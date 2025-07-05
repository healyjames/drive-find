import React, { useState } from 'react'
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { Feature, Point } from 'geojson'
import { IPost } from '@/models/Post'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MarkerDetails } from '@/components/marker-details'

type TreeMarkerProps = {
  position: google.maps.LatLngLiteral
  feature: Feature<Point, IPost>
}

export const FeatureMarker = ({ position, feature }: TreeMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleClick = () => {
    setIsSheetOpen(true)
  }

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <AdvancedMarker
            ref={markerRef}
            position={position}
            onClick={handleClick}
            anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
          >
            <div className="z-10 relative w-8 h-8 bg-secondary-base rounded-full border-[3px] border-white shadow-md transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"></div>
            <div className="h-4 w-full bg-[#000] rounded-[50%] opacity-20 -mt-1"></div>
          </AdvancedMarker>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Feature Details</SheetTitle>
            <SheetDescription>
              Details about the selected feature.
            </SheetDescription>
          </SheetHeader>
          <MarkerDetails feature={feature.properties} />
        </SheetContent>
      </Sheet>
    </>
  )
}
