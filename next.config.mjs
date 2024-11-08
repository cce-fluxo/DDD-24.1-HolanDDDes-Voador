/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Permite carregar imagens do Cloudinary
      },
    ],
  },
  webpack(config, { isServer }) {
    // Configuração para processar arquivos SVG usando SVGR
    config.module.rules.push({
      test: /\.svg$/, // Arquivos SVG
      use: ["@svgr/webpack"], // Usa o SVGR para transformar o SVG em um componente React
    });

    return config; // Retorna a configuração do Webpack com as alterações
  },
};

export default nextConfig;
