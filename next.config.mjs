import path from 'path';

/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|swf|ogv)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/media/',
                    publicPath: '/_next/static/media/',
                },
            },
        });

        return config;
    },
    sassOptions: {
        includePaths: ['./scss'],
    },
    images: {
        domains: ['images.unsplash.com', 'api.maiontech.com.br', 'localhost']
    },
    output: "standalone"
};

export default nextConfig;
