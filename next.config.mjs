
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
		],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
};

export default nextConfig;
