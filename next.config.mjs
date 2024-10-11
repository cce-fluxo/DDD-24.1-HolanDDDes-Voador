/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) { //https://www.npmjs.com/package/@svgr/webpack
      config.module.rules.push({
        test: /\.svg$/, // arquivos SVG
        use: ['@svgr/webpack'], // Utiliza o SVGR para transformar o SVG em componente React
      });
  
      return config; // Retorna a configuração do webpack com as alterações
    },
  };

export default nextConfig;