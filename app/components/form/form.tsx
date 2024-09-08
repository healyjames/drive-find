'use client'

import React, { useState, useRef, useCallback, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

import { Autocomplete } from '@react-google-maps/api'

import { GoogleApiProvider as AutocompleteProvider } from "../utils/google"
import { LogoAnimation } from "../loading/logo-animation"

interface FormProps {
    className: string
}

const error = <p>error</p>
const loading = <div className="flex justify-center items-center"><div><LogoAnimation /></div></div>

export const Form = (props: FormProps) => {

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
    const [place, setPlace] = useState<google.maps.places.PlaceResult | null>()
    const [input, setInput] = useState('')
    const router = useRouter()

    const onLoad = (autoC: google.maps.places.Autocomplete): void => {
        autocompleteRef.current = autoC
    }

    const onPlaceChanged = (): void => {
        const autocomplete = autocompleteRef.current
        if (autocomplete !== null) {
            const getPlace = autocomplete.getPlace()
            setPlace(getPlace)
            setInput(getPlace.formatted_address || "")
        } else {
            console.error('Autocomplete is not loaded yet :/')
        }
    }

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value)
    }, [])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // router.push(`/results?lat=${place?.geometry?.location?.lat()}&lng=${place?.geometry?.location?.lng()}`)
    }

    return (
        <React.Fragment>
            <AutocompleteProvider error={error} loading={loading}>
                <form onSubmit={onSubmit} className={`${props.className} max-w-md w-full px-4`}>
                    <div className="mb-2">
                        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                            {/* TODO: need to fix: partially filling form, selecting with keyboard and hitting enter can have undefined lat lng */}
                            <input 
                                type="text"
                                id="location"
                                className="form-input-light"
                                placeholder="Your location..."
                                value={input}
                                onChange={handleInputChange}
                                required
                            />
                        </Autocomplete>
                        <input type="hidden" name="lat" value={`${place?.geometry?.location?.lat()}` || ''} />
                        <input type="hidden" name="lng" value={`${place?.geometry?.location?.lng()}` || ''} />
                    </div>
                    <button type="submit" className="btn-light">Go</button>
                </form>
            </AutocompleteProvider>
        </React.Fragment>
    )
}