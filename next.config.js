const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'localhost',
      'res.cloudinary.com',
      'nlw-spacetime-3nhe.onrender.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
