'use client'

import React from "react"

import { GoogleMap, Libraries, useJsApiLoader } from '@react-google-maps/api'

import { LogoAnimation } from "../loading/logo-animation"

const libraries = ['places', 'drawing', 'geometry']

const defaultMapContainerStyle = {
    width: '100%',
    height: '100vh'
}

export const MapProvider = ({ children }: { children: React.ReactNode }) => {

    // Load the Google Maps JavaScript API asynchronously
    const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        libraries: libraries as Libraries,
    })  

    if (loadError) return <p>Encountered error while loading google maps</p>

    if (!scriptLoaded) return <div className="w-screen h-screen flex justify-center items-center"><div><LogoAnimation /></div></div>

    return children
}

export const Map = () => {

    return (
        <React.Fragment>
            <MapProvider>
                <GoogleMap mapContainerStyle={defaultMapContainerStyle} />
            </MapProvider>
        </React.Fragment>
    )
}