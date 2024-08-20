'use client'

import React from "react"

import { GoogleMap, Libraries, useJsApiLoader } from '@react-google-maps/api'

import { LogoAnimation } from "../loading/logo-animation"
import { GoogleApiProvider as MapProvider } from "../utils/google"
import googleMapWizardStyling from './wizard.json'

const libraries = ['places', 'drawing', 'geometry']

interface MapTypeStyle {
    elementType?: string | null;
    featureType?: string | null;
    stylers: object[];
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

const error = <p>Encountered error while loading google maps</p>
const loading = <div className="w-screen h-screen flex justify-center items-center"><div><LogoAnimation /></div></div>

export const Map = () => {

    return (
        <React.Fragment>
            <MapProvider error={error} loading={loading}>
                <GoogleMap
                    mapContainerStyle={mapDefaults.style}
                    center={mapDefaults.coordinates}
                    zoom={mapDefaults.zoom}
                    options={mapDefaults.options}
                />
            </MapProvider>
        </React.Fragment>
    )
}