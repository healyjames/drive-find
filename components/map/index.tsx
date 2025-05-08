"use client";

import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";

import React, { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";
import { IPost } from "@/models/Post";
import googleMapWizardStyling from "./wizard";
import { CustomAdvancedMarker } from "./custom-advanced-marker";

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

interface MapTypeStyle {
    elementType?: string | null;
    featureType?: string | null;
    stylers: object[];
}

interface ProgressBarProps {
    progress: number;
    message?: string;
}

const mapStyle: MapTypeStyle[] = googleMapWizardStyling;

const mapDefaults = {
    coordinates: {
        lat: 53.18136494812854,
        lng: -2.6165447846574437,
    },
    options: {
        zoomControl: false,
        tilt: 0,
        gestureHandling: "auto",
        mapTypeId: "roadmap",
        disableDefaultUI: true,
        keyboardShortcuts: false,
        styles: mapStyle,
    },
    style: {
        width: "100%",
        height: "100vh",
    },
    zoom: 14,
};

const ProgressBar = ({ progress, message }: ProgressBarProps) => {
    return (
        <div className="fixed top-0 left-0 w-full z-100 p-2 h-screen w-screen bg-white bg-opacity-60">
            <div className="flex flex-row min-h-screen justify-center items-center">
                <div>
                    {message && (
                        <p className="text-xs text-primary-dark mb-1">
                            {message}
                        </p>
                    )}
                    <Progress value={progress} className="max-w-[120px]" />
                </div>
            </div>
        </div>
    );
};

export const Map = () => {
    const [lat, setLat] = useState<number>(mapDefaults.coordinates.lat);
    const [lng, setLng] = useState<number>(mapDefaults.coordinates.lng);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [postLoading, setPostLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        setProgress(10);

        const fetchPosts = async () => {
            interval = setInterval(() => {
                setProgress((prev) => (prev < 90 ? prev + 10 : prev));
            }, 200);

            try {
                const response = await fetch("/api/posts");
                if (!response.ok) {
                    throw new Error(
                        "Network response fetching from /api/posts was not ok."
                    );
                }

                const results = await response.json();
                if (!results || results.length < 1) {
                    console.log("no results");
                }

                setPosts(results);
                setProgress(100);
                setPostLoading(false);
            } catch (error) {
                console.error("Failed to fetch posts from api.");
            } finally {
                clearInterval(interval);
                setTimeout(() => setProgress(0), 500);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setLat(Number(queryParams.get("lat")));
        setLng(Number(queryParams.get("lng")));
    }, []);

    return (
        <React.Fragment>
            <APIProvider apiKey={API_KEY}>
                <GoogleMap
                    style={{ width: "100vw", height: "100vh" }}
                    styles={mapStyle}
                    defaultCenter={{
                        lat: lat,
                        lng: lng,
                    }}
                    defaultZoom={mapDefaults.zoom}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                >
                    {postLoading ? (
                        <ProgressBar
                            message="Fetching data..."
                            progress={progress}
                        />
                    ) : (
                        posts.map((post, index) => (
                            <CustomAdvancedMarker key={index} post={post} />
                        ))
                    )}
                </GoogleMap>
            </APIProvider>
        </React.Fragment>
    );
};
