'use client'

import React, { useEffect, useState } from "react"

import { GoogleMap, Marker } from '@react-google-maps/api'

import { LogoAnimation } from "@/components/loading/logo-animation"
import { GoogleApiProvider as MapProvider } from "@/components/utils/google"
import { Progress } from "@/components/ui/progress"
import { IPost } from "@/models/Post"
import googleMapWizardStyling from './wizard.json'

interface MapTypeStyle {
    elementType?: string | null
    featureType?: string | null
    stylers: object[]
}

interface ProgressBarProps {
    progress: number
    message?: string
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

const ProgressBar = ({ progress, message }: ProgressBarProps) => {
    return (
        <div className="fixed top-0 left-0 w-full z-100 p-2 h-screen w-screen bg-white bg-opacity-60">
            <div className="flex flex-row min-h-screen justify-center items-center">
                <div>
                {message && (<p className="text-xs text-primary-dark mb-1">{message}</p>)}
                <Progress value={progress} className="max-w-[120px]" />
                </div>
            </div>
        </div>
    )
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
            <MapProvider error={error} loading={loading}>
                <GoogleMap
                    mapContainerStyle={mapDefaults.style}
                    center={{
                        lat: lat,
                        lng: lng
                    }}
                    zoom={mapDefaults.zoom}
                    options={mapDefaults.options}
                >
                    {postLoading ? (
                        <ProgressBar message="Fetching data..." progress={progress} />
                    ) : (
                        posts.map((post, index) => (
                            <Marker 
                                key={index} 
                                position={{ lat: post.location.latitude, lng: post.location.longitude }} 
                                label={post.location.placeName} 
                            />
                        ))
                    )}
                </GoogleMap>
            </MapProvider>
        </React.Fragment>
    )
}