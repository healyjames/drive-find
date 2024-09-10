declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_GOOGLE_MAP_API: string
            ENV: string
            GOOGLE_CLIENT_ID: string,
            GOOGLE_CLIENT_SECRET: string,
            GITHUB_ID: string,
            GITHUB_SECRET: string,
        }
    } 
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}