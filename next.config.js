/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip building /admin page at build time - it's a dynamic route
  // that requires authentication and dynamic data
};

module.exports = nextConfig;

