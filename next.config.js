/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ["api.verixr.com", "res.cloudinary.com"],
    },
}

module.exports = nextConfig
