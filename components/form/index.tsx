'use client'

import React, { FormEvent, useCallback, useState, useEffect } from 'react'
// import { useRouter } from "next/navigation"

import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useAutocompleteSuggestions } from '@/hooks/use-autocomplete-suggestions'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"

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
        console.log((event.target as HTMLInputElement).value)
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
                <div>
                    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                        <CommandInput 
                            id="location"
                            placeholder="Your location..."
                            onValueChange={setInputValue}
                        />
                        {suggestions.length > 0 && (
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                    {suggestions.map((suggestion, index) => {
                                        return (
                                            <CommandItem
                                                key={index}
                                                className="custom-list-item cursor-pointer"
                                                onClick={() => handleSuggestionClick(suggestion)}
                                            >
                                                {suggestion.placePrediction?.text.text}
                                            </CommandItem>
                                        )}
                                    )}
                                </CommandGroup>
                            </CommandList>
                        )}
                    </Command>
                </div>
            </form>
        </React.Fragment>
    )
}