const baseConfig = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const CopyWbpackPlugin = require("copy-webpack-plugin");

function resolve(dir) {
    return path.resolve(__dirname, '../', dir)
}
module.exports = webpackMerge(baseConfig, {
    mode: 'production',
    optimization: {
        namedChunks: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial'
                },
                elementUI: {
                    name: 'chunk-elementUI',
                    priority: 20,
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                },
                commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'),
                    minChunks: 3,
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BASE_URL': "''"
        }),
        new CopyWbpackPlugin([
            // { from: "static/control", to: "static/control"},
            // { from: "static/components", to: "static/components"},
            // { from: "static/form", to: "static/form"},
            // { from: "static/ibps-prod", to: "static/ibps-prod"},
            // { from: "static/kettle", to: "static/kettle"},
            // { from: "static/mapfiles", to: "static/mapfiles"},
            // { from: "static/mxgraph", to: "static/mxgraph"},
            // { from: "static/upload", to: "static/upload"},
            // { from: "static/threedmap", to: "static/threedmap"},
            // { from: "static/version.js", to: "static/version.js"}
        ]),
    ]
});