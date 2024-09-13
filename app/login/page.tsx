import Link from 'next/link'

import Header from '../components/header/page'
import { GithubIcon } from '../components/icons/icon'

const ProviderComponent = (props: {children: React.ReactNode}) => {
    return(
        <button className={`p-4 w-full border flex flex-row flex-nowrap justify-center gap-4 hover:bg-primary-light hover:border-primary-light`}>
            {props.children}
        </button>
    )
}

export default function Login() {
    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className='m-auto p-4 md:max-w-[676px] md:mx-auto'>
                <div className='mb-4'>
                    <p>Login with:</p>
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <ProviderComponent>
                        <p>GitHub</p>
                        <GithubIcon />
                    </ProviderComponent>
                    <div className='p-4 w-full border flex justify-center bg-grey-light text-primary-base'>
                        <p>More providers coming soon</p>
                    </div>
                </div>
                <div className='mt-16 text-center'>
                    <p>Not got an account? <Link href='/signup' className='border-b'>Sign up here.</Link></p>
                </div>
            </div>
        </div>
    )
}