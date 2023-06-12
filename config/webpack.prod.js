const path = require('path');
const baseConfig = require('./base');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    stats: 'errors-warnings',
    performance: {
        maxAssetSize: 350000,
        maxEntrypointSize: 350000,
    },
    plugins: [
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['mozjpeg', { progressive: true }],
                    ['pngquant', { quality: [0.65, 0.9] }],
                    [
                        'svgo',
                        {
                            plugins: [
                                {
                                    name: 'removeViewBox',
                                    active: false,
                                },
                                {
                                    name: 'addAttributesToSVGElement',
                                    params: {
                                        attributes: [
                                            {
                                                xmlns: 'http://www.w3.org/2000/svg',
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                ],
            },
        }),
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public/favicon.ico'),
                    to: path.resolve(__dirname, '../build/favicon.ico'),
                },
            ],
        }),
    ],
});
