
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

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
				hostname: "pub-3776ca07607e43cd95caba4dbe54049a.r2.dev",
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

if (process.env.NODE_ENV === 'development') {
	await setupDevPlatform();
  }

export default nextConfig;
