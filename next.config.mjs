/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iiqmtmasbwanbmwctrbs.supabase.co",
      },
    ],
  },
};

export default nextConfig;
