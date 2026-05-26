// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   async rewrites() {
//     return [
//       {
//         // Jab bhi frontend '/api/proxy' par request bhejega
//         source: '/api/proxy/:path*',
//         // Wo piche se is address par redirect ho jayegi
//         destination: 'http://127.0.0.1:5001/api/:path*', 
//       },
//     ];
//   },
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Jab bhi frontend '/api/full-audit/:path*' ko hit karega
        source: '/api/full-audit/:path*',
        // Wo chupchaap peeche se python backend ko ye headers bhej dega
        destination: 'http://127.0.0.1:5001/api/full-audit/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'ngrok-skip-browser-warning', value: '69420' },
          { key: 'Content-Type', value: 'application/json' }
        ],
      },
    ];
  }
};

export default nextConfig;