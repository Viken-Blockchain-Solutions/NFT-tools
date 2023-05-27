/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['mongoose'],
    },
    images: {
        domains: ['tecdn.b-cdn.net' , 'mdbootstrap.com', 'cdn2.benzinga.com','i.pinimg.com','i.seadn.io'],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    },
}

module.exports = nextConfig
