
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},	
			{
				protocol: "https",
				hostname: "www.asya.uy",
			},
			{
				protocol: "https",
				hostname: "asya.uy",
			},
			{
				protocol: "https",
				hostname: "cdn.asya.uy",
			},
			{
				protocol: "https",
				hostname: "asya-production.up.railway.app",
			},
		],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },

  
};

export default nextConfig;
