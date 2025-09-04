import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['source.unsplash.com', 'picsum.photos', 'res.cloudinary.com'],
  },
  devIndicators: false,
}

export default nextConfig
