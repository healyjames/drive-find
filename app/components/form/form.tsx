import React from "react"

interface FormProps {
    className: string
}

export const Form = (props: FormProps) => {

    return (
        <React.Fragment>
            <form className={`${props.className} w-full px-4`}>
                <div className="mb-2">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your location</label>
                    <input type="text" id="location" className="form-input-light" placeholder="Somewhere..." required />
                </div>
                <button type="submit" className="btn-light">Go</button>
            </form>
        </React.Fragment>
    )
}