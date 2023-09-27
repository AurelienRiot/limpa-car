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
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.externals = config.externals.map((external) => {
  //       if (typeof external !== "function") return external;
  //       return (ctx, req, cb) =>
  //         /three|@react-three\/drei/.test(req) ? cb() : external(ctx, req, cb);
  //     });
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;
