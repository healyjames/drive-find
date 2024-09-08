'use client'

import React, { useEffect, useState, useRef, useCallback, ChangeEvent } from "react"
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
    const [submit, setSubmit] = useState(false)
    const router = useRouter()

    const onLoad = (autoC: google.maps.places.Autocomplete): void => {
        autocompleteRef.current = autoC
    }

    const onPlaceChanged = (): void => {
        const autocomplete = autocompleteRef.current
        if (autocomplete !== null) {
            const getPlace = autocomplete.getPlace()
            if (getPlace) {
                console.log("getPlace", getPlace)
                setPlace(getPlace);
                setInput(getPlace.formatted_address || "")
                setSubmit(true)
            } else {
                console.warn('Place data is incomplete or not available yet.')
            }
        } else {
            console.error('Autocomplete is not loaded yet.')
        }
    }

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value)
    }, [])

    useEffect(() => {
        if (submit) {
            router.push(`/results?lat=${place?.geometry?.location?.lat()}&lng=${place?.geometry?.location?.lng()}`)
        }
    }, [submit])

    return (
        <React.Fragment>
            <AutocompleteProvider error={error} loading={loading}>
                <form onSubmit={(e) => {e.preventDefault()}} className={`${props.className} max-w-md w-full px-4`}>
                    <div className="mb-2">
                        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
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