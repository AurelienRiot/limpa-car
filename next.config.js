/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
    ],
  },
  transpilePackages: ["three"],
};

module.exports = nextConfig;
