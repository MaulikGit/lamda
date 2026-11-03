import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/modalities/proteins',
        destination: '/modalities/proteins-peptides',
        permanent: true,
      },
      {
        source: '/modalities/biosimilars',
        destination: '/modalities/mabs',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
