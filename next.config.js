/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['mdbootstrap.com', 'cdn2.benzinga.com','i.pinimg.com','i.seadn.io'],
    },
}

module.exports = nextConfig
