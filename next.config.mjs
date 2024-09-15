/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname:'**'
            },
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                port: '',
                pathname:'**'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname:'**'
            },
            {
                protocol: 'https',
                hostname: 'https://github.com',
                port: '',
                pathname: '**'
            }
        ],
    },
};

export default nextConfig;
