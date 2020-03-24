const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const happypack = require("happypack");
const os = require("os");
const happyThreadPool = happypack.ThreadPool({ size: os.cpus().length });
const MiniExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

function resolve(dir) {
    return path.resolve(__dirname, "../", dir);
}

let htmlPlugin = [
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: resolve("public/index.html"),
        favicon: resolve("public/favicon.ico"),
        chunks: ["app", "chunk-libs", "chunk-elementUI", "chunk-commons"],
        chunksSortMode: "manual"
    })
];

module.exports = {
    entry: {
        app: ["@babel/polyfill", resolve("src/entry/main.js")]
    },
    output: {
        path: resolve("dist"),
        filename: "js/[name].bundle.[hash:8].js",
        chunkFilename: "js/[name].chunk.[hash:8].js",
        publicPath: process.env.NOED_ENV === "production" ? "./" : ""
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: [{
                    loader: "vue-loader",
                    options: {}
                }]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: "happypack/loader?id=happyBable"
                }],
                exclude: [/node_modules/, resolve("static")]
            },
            {
                test: /\.(css|less)$/,
                use: [{
                        loader: MiniExtractPlugin.loader,
                        options: {
                            sourceMap: true,
                            publicPath: "../"
                        }
                    },
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                        loader: MiniExtractPlugin.loader,
                        options: {
                            sourceMap: true,
                            publicPath: "../"
                        }
                    },
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                                // fiber: Fiber
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: {
                    loader: "svg-sprite-loader",
                    options: {
                        symbolId: "icon-[name]"
                    }
                },
                include: [resolve("src/icons")]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 10000,
                        name: "image/[name].[hash:7].[ext]",
                        outputPath: "./img"
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "media/[name].[hash:7].[ext]"
                }
            },
            {
                test: /\.(woff2?|woff|truetype|eot|embedded-opentype|ttf|TTF|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "fonts/[name].[hash:7].[ext]",
                    publicPath: "../"
                }
            }
        ]
    },
    plugins: [
        ...htmlPlugin,
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../"),
            verbose: true
        }),
        new happypack({
            id: "happyBable",
            loaders: [{
                loader: "babel-loader?cacheDirectory=true"
            }],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new MiniExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].chunk.[contenthash:8].css"
        }),
        new ProgressBarPlugin({
            format: "  build [:bar] " +
                chalk.green.bold(":percent") +
                " (:elapsed seconds)",
            clear: false
        })
    ],
    resolve: {
        extensions: [".vue", ".js", ".less", ".css", ".scss", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src")
        }
    }
};