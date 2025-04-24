'use client'

import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';

import React, { useEffect, useState } from "react"

// import { LogoAnimation } from "@/components/loading/logo-animation"
import googleMapWizardStyling from './wizard.json'

interface MapTypeStyle {
    elementType?: string | null
    featureType?: string | null
    stylers: object[]
}

const mapStyle: MapTypeStyle[] = googleMapWizardStyling as MapTypeStyle[]

const mapDefaults = {
    coordinates: {
        lat: 53.18136494812854,
        lng: -2.6165447846574437
    },
    options: {
        zoomControl: false,
        tilt: 0,
        gestureHandling: 'auto',
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        keyboardShortcuts: false,
        styles: mapStyle
    },
    style: {
        width: '100%',
        height: '100vh'
    },
    zoom: 14
}

// const error = <p>Encountered error while loading google maps</p>
// const loading = <div className="w-screen h-screen flex justify-center items-center"><div><LogoAnimation /></div></div>

export const Map = () => {

    const [lat, setLat] = useState<number>(mapDefaults.coordinates.lat)
    const [lng, setLng] = useState<number>(mapDefaults.coordinates.lng)

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        setLat(Number(queryParams.get('lat')))
        setLng(Number(queryParams.get('lng')))
    }, [])

    return (
        <React.Fragment>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}>
                <GoogleMap
                    style={{width: '100vw', height: '100vh'}}
                    defaultCenter={{
                        lat: lat,
                        lng: lng
                    }}
                    defaultZoom={mapDefaults.zoom}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                />
            </APIProvider>
        </React.Fragment>
    )
}