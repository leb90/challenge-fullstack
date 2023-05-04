/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  babel: {
    presets: ['next/babel'],
  },
  env: {
    API_URL: process.env.API_URL,
  }
}

module.exports = nextConfig
