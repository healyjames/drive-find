'use client'

import React, { FormEvent, useCallback, useState, useEffect } from 'react'
// import { useRouter } from "next/navigation"

import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useAutocompleteSuggestions } from '@/hooks/use-autocomplete-suggestions'

import { Input } from "@/components/ui/input"

interface FormProps {
    customClassName: string
}

export const Form = ({ customClassName }: FormProps) => {

    const places = useMapsLibrary('places')

    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.Place | null>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const {suggestions, resetSession} = useAutocompleteSuggestions(inputValue)

    const handleInputChange = useCallback((event: FormEvent<HTMLInputElement>) => {
        setInputValue((event.target as HTMLInputElement).value)
    }, [])

    const handleSuggestionClick = useCallback(
        async (suggestion: google.maps.places.AutocompleteSuggestion) => {
            if (!places) return
            if (!suggestion.placePrediction) return
    
            const place = suggestion.placePrediction.toPlace()
        
            await place.fetchFields({
                fields: [
                    'viewport',
                    'location',
                    'svgIconMaskURI',
                    'iconBackgroundColor'
                ]
            })
            
            setInputValue('')
            resetSession()
            setSelectedPlace(place)
        }, [places, setSelectedPlace]
    )

    return (
        <React.Fragment>
            <form onSubmit={(e) => {e.preventDefault()}} className={`${customClassName} max-w-md w-full px-4`}>
                <div className="mb-2">
                    <Input 
                        type="text"
                        id="location"
                        placeholder="Your location..."
                        value={inputValue}
                        onChange={handleInputChange}
                        className="w-full text-lg"
                        required
                    />
                </div>
                <div>
                    {suggestions.length > 0 && (
                        <ul className="custom-list">
                        {suggestions.map((suggestion, index) => {
                            return (
                            <li
                                key={index}
                                className="custom-list-item"
                                onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.placePrediction?.text.text}
                            </li>
                            );
                        })}
                        </ul>
                    )}
                </div>
            </form>
        </React.Fragment>
    )
}