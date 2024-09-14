import Link from 'next/link'

import Header from '../components/header/page'

import { GitHubSignIn } from '../components/utils/auth-component'
import { auth } from '@/auth'
import SessionData from '../components/utils/session-data'

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

                    {!session?.user ? <GitHubSignIn provider='GitHub'/> : <></>}
                    
                    <div className='p-4 w-full border flex justify-center bg-grey-light text-primary-base'>
                        <p>More providers coming soon</p>
                    </div>
                </div>
                <div className='mt-16 text-center'>
                    <p>Not got an account? <Link href='/signup' className='border-b'>Sign up here.</Link></p>
                </div>

                <SessionData session={session} />
            </div>
        </div>
    )
}