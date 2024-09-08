import { useJsApiLoader, Libraries } from '@react-google-maps/api'

const libraries = ['places', 'drawing', 'geometry']

export const GoogleApiProvider = ({ children, error, loading }: { children: React.ReactNode, error: React.ReactNode, loading: React.ReactNode }) => {

    const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        libraries: libraries as Libraries
    })

    if (loadError) return error

    if (!scriptLoaded) return loading

    return children
}