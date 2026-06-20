import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  compress: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "t1.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev",
      },
      {
        protocol: "https",
        hostname: "www.flashfirejobs.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.adobe.com",
      },
      {
        protocol: "https",
        hostname: "pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev",
      },
    ],
  },
  
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Proxy /register and all sub-routes to the register ads website
        {
          source: '/register',
          destination: `${process.env.REGISTER_APP_URL || 'https://flashfire-register-ads-website.vercel.app'}/register`,
        },
        {
          source: '/register/:path*',
          destination: `${process.env.REGISTER_APP_URL || 'https://flashfire-register-ads-website.vercel.app'}/register/:path*`,
        },
        // Proxy /meeting-booked to the register app (it lives there)
        {
          source: '/meeting-booked',
          destination: `${process.env.REGISTER_APP_URL || 'https://flashfire-register-ads-website.vercel.app'}/meeting-booked`,
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/refundpolicy",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/RefundPolicy",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/PrivacyPolicy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/privacypolicy",
        destination: "/privacy-policy",
        permanent: true,
      },
      // Redirect malformed routes
      {
        source: "/&",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blogs/2",
        destination: "/blog/why-finding-a-job-in-the-us-as-a-new-graduate-feels-impossible",
        permanent: true,
      },
      {
        source: "/blogs/15",
        destination: "/blog/the-job-hunt-nearly-broke-me-until-i-discovered-this-one-strategy-that-changed-everything",
        permanent: true,
      },
      // Redirect old feature pages to new /features/ paths
      {
        source: "/ats-optimized-resume-checker",
        destination: "/features/resume-optimizer",
        permanent: true,
      },
      {
        source: "/features/ats-optimizer",
        destination: "/features/resume-optimizer",
        permanent: true,
      },
      {
        source: "/en-ca/features/ats-optimizer",
        destination: "/en-ca/features/resume-optimizer",
        permanent: true,
      },
      {
        source: "/job-application-automation",
        destination: "/features/job-automation",
        permanent: true,
      },
      {
        source: "/linkedin-profile-optimization-services",
        destination: "/features/linkedin-profile-optimization",
        permanent: true,
      },
      {
        source: "/features/linkedin-profile-optimization-services",
        destination: "/features/linkedin-profile-optimization",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "/how-flashfire-ai-job-automation-platform-works",
        permanent: true,
      },
      {
        source: "/en-ca/how-it-works",
        destination: "/en-ca/how-flashfire-ai-job-automation-platform-works",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
