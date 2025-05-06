'use client'

import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';

import React, { useEffect, useState } from "react"

// import { LogoAnimation } from "@/components/loading/logo-animation"
import googleMapWizardStyling from './wizard'

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API

interface MapTypeStyle {
    elementType?: string | null
    featureType?: string | null
    stylers: object[]
}

const mapStyle: MapTypeStyle[] = googleMapWizardStyling

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

export const Map = () => {

    const [lat, setLat] = useState<number>(mapDefaults.coordinates.lat)
    const [lng, setLng] = useState<number>(mapDefaults.coordinates.lng)
    const [posts, setPosts] = useState<IPost[]>([])
    const [postLoading, setPostLoading] = useState<boolean>(true)
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        let interval: NodeJS.Timeout
        setProgress(10)

        const fetchPosts = async () => {
            interval = setInterval(() => {
                setProgress((prev) => (prev < 90 ? prev + 10 : prev))
            }, 200)

            try {
                
                const response = await fetch('/api/posts')
                if (!response.ok) {
                    throw new Error('Network response fetching from /api/posts was not ok.');
                }

                const results = await response.json()
                if(!results || results.length < 1) {
                    console.log("no results");
                }

                setPosts(results)
                setProgress(100)
                setPostLoading(false)
            } catch(error) {
                console.error('Failed to fetch posts from api.')
            } finally {
                clearInterval(interval)
                setTimeout(() => setProgress(0), 500)
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
                    style={{width: '100vw', height: '100vh'}}
                    styles={mapStyle}
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