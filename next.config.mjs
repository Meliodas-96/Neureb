import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  reactStrictMode: false,
  outputFileTracingRoot: __dirname,
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    '10.242.68.158:3000',
    '192.168.1.134:3000',
  ],
};

export default nextConfig;
