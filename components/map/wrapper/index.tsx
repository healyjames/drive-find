'use client'

import { APIProvider } from "@vis.gl/react-google-maps"

import { LogoAnimation } from "@/components/loading/logo-animation"
import { Map } from ".."

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API

const error = () => { return <p>error</p> }
const loading = () => { return <div className="flex justify-center items-center"><div><LogoAnimation /></div></div> }

export const FormWrapper = () => {
    return (
        <APIProvider apiKey={API_KEY} version={'beta'} onError={error} onLoad={loading}>
            <Map />
        </APIProvider>
    )
}