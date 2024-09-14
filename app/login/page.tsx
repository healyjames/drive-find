import Header from '../components/header/page'
import { auth, signIn, signOut, providerMap } from "@/auth"

import { GithubIcon } from '../components/icons/icon'

const ProviderSignInButton = (props: {name: string}) => {
    return (
        <button className={`p-4 w-full border flex flex-row flex-nowrap justify-center gap-4 hover:bg-primary-light hover:border-primary-light`}>
            <p>Sign in with {props.name}</p>
            {props.name === "GitHub" && <GithubIcon />}
        </button>
    )
}

export default async function Login() {
    const session = await auth()
    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className='m-auto p-4 md:max-w-[676px] md:mx-auto'>
                <div className='mb-4'>
                    <p>Login with:</p>
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

                    {!session?.user ? (
                        Object.values(providerMap).map((provider) => (
                            <form
                                className="[&>div]:last-of-type:hidden"
                                key={provider.id}
                                action={async () => {
                                    "use server"
                                    await signIn(provider.id, { redirectTo: "/" })
                                }}
                            >
                                <ProviderSignInButton name={provider.name} />
                            </form>
                        ))
                    ) : (
                        <>
                        <p>You are logged in</p>
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut()
                                }}
                                className="w-full"
                                >
                                <button>
                                    Sign Out
                                </button>
                            </form>
                        </>
                    )}
                    
                    <div className='p-4 w-full border flex justify-center bg-grey-light text-primary-base'>
                        <p>More providers coming soon</p>
                    </div>
                </div>

                {/* <div className='mt-16 text-center'>
                    <p>Not got an account? <Link href='/signup' className='border-b'>Sign up here.</Link></p>
                </div> */}
            </div>
        </div>
    )
}