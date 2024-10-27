/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allows all hostnames with HTTPS
            },
            {
                protocol: 'http',
                hostname: '**', // Allows all hostnames with HTTP
            },
        ]
    }
};

export default nextConfig;
