'use client'

import React, { useState, useEffect, useCallback, ChangeEvent} from "react"

import { Autocomplete, useJsApiLoader, Libraries } from '@react-google-maps/api'

import { LogoAnimation } from "../loading/logo-animation"

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

    if (!scriptLoaded) return <div className="flex justify-center items-center"><div><LogoAnimation /></div></div>

    return children
}

export const Form = (props: FormProps) => {

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
    const [input, setInput] = useState('')

    const onLoad = (autoC: google.maps.places.Autocomplete): void => {
        setAutocomplete(autoC)
    }

    const onPlaceChanged = (): void => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace()
            console.log(place);
            setInput(place.formatted_address || "")
        } else {
            console.error('Autocomplete is not loaded yet :/')
        }
    }

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value)
    }, [])

    return (
        <React.Fragment>
            <AutocompleteProvider>
                <form action="/results" method="POST" className={`${props.className} max-w-md w-full px-4`}>
                    <div className="mb-2">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your location</label>
                        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                            <input 
                                type="text"
                                id="location"
                                className="form-input-light"
                                placeholder="Somewhere..."
                                value={input}
                                onChange={handleInputChange}
                                required
                            />
                        </Autocomplete>
                    </div>
                    <button type="submit" className="btn-light">Go</button>
                </form>
            </AutocompleteProvider>
        </React.Fragment>
    )
}