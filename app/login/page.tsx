import { Header } from "../components/header/header"
import { auth, signIn, signOut, providerMap } from "@/auth"

import { GithubIcon, GoogleIcon } from '../components/icons/icon'

const ProviderSignInButton = (props: {name: string}) => {
    return (
        <button className={`p-4 w-full border flex flex-row flex-nowrap justify-center gap-4 hover:bg-primary-light hover:border-primary-light`}>
            <p>{props.name}</p>
            {props.name === "GitHub" && <GithubIcon />}
            {props.name === "Google" && <GoogleIcon />}
        </button>
    )
}

export default async function Login() {
    const session = await auth()
    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className='m-auto p-4 md:max-w-[676px] md:mx-auto'>
                {!session?.user ? (
                    <>
                        <div className='mb-4'>
                            <p>Login with:</p>
                        </div>
                        
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            {Object.values(providerMap).map((provider, index, arr) => (
                                    <form
                                        className={`[&>div]:last-of-type:hidden md:col-span-1 ${index === arr.length - 1 && arr.length % 2 !== 0 ? 'md:col-span-2' : ''}`}
                                        key={provider.id}
                                        action={async () => {
                                            "use server"
                                            await signIn(provider.id, { redirectTo: "/" })
                                        }}
                                    >
                                        <ProviderSignInButton name={provider.name} />
                                    </form>
                                ))}
                            <div className='p-4 w-full border flex justify-center bg-grey-light text-primary-base md:col-span-2'>
                                <p>More providers coming soon</p>
                            </div>
                        </div>

                    </>
                ) : (
                    <form
                        action={async () => {
                            "use server"
                            await signOut()
                        }}
                        className="w-full"
                    >
                        <button className={`p-4 w-full border flex flex-row flex-nowrap justify-center gap-4 hover:bg-primary-light hover:border-primary-light`}>
                            <p>Sign Out</p>
                        </button>
                    </form>
                )}

                {/* <div className='mt-16 text-center'>
                    <p>Not got an account? <Link href='/signup' className='border-b'>Sign up here.</Link></p>
                </div> */}
            </div>
        </div>
    )
}