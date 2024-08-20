'use client'

import React, { useState, useEffect} from "react"

import { Autocomplete, useJsApiLoader, Libraries } from '@react-google-maps/api'

interface FormProps {
    className: string
}

const libraries = ['places']

export const AutocompleteProvider = ({ children }: { children: React.ReactNode }) => {

    const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        libraries: libraries as Libraries
    })

    if (loadError) return <p>error</p>

    if (!scriptLoaded) return <div className="w-screen h-screen flex justify-center items-center"><div>Loading</div></div>

    return children
}

export const Form = (props: FormProps) => {

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
    const [input, setInput] = useState('')

    useEffect(() => {
        console.log(input)
    }, [input])

    return (
        <React.Fragment>
            <form action="/results" method="POST" className={`${props.className} max-w-md w-full px-4`}>
                <div className="mb-2">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your location</label>
                    <input type="text" id="location" className="form-input-light" placeholder="Somewhere..." required />
                </div>
                <button type="submit" className="btn-light">Go</button>
            </form>
        </React.Fragment>
    )
}