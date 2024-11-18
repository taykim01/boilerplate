/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '5mb',
      },
    },
    images: {
      domains: ['projectID.supabase.co']
    },
    reactStrictMode: false,
  };
  
  export default nextConfig;
  