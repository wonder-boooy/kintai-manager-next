/** @type {import('next').NextConfig} */
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  scope: "/",
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({});

export default nextConfig;
