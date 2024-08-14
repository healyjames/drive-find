'use client'

import React, { useState, useEffect, useRef} from "react"

interface FormProps {
    className: string
}

export const Form = (props: FormProps) => {

    const [input, setInput] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInput((values) => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        console.log(input)
    }, [input])

    return (
        <React.Fragment>
            <form action="/results" method="POST" className={`${props.className} max-w-md w-full px-4`}>
                <div className="mb-2">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your location</label>
                    <input type="text" id="location" className="form-input-light" placeholder="Somewhere..." required onChange={handleChange} />
                </div>
                <button type="submit" className="btn-light">Go</button>
            </form>
        </React.Fragment>
    )
}