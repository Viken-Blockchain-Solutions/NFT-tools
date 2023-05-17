/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['mdbootstrap.com'],
    },
}

module.exports = nextConfig
