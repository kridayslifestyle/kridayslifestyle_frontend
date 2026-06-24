/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "store.kridaylifestyle.in",
      pathname: "/wp-content/uploads/**",
    },
    {
      protocol: "https",
      hostname: "via.placeholder.com",
    },
  ],
},

};

export default nextConfig;
