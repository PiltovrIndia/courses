/** @type {import('next').NextConfig} */
const nextConfig = {};

export default {
    ...nextConfig,
    env: {
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
    },
    images: {
        domains: ['avatars.githubusercontent.com'],
    },
}
