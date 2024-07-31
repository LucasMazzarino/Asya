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
				hostname: "gemstonuruguay.com",
			},
			{
				protocol: "https",
				hostname: "cdn.gemstonuruguay.com",
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
  }
  
};

export default nextConfig;
