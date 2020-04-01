const baseConfig = require("./webpack.config.base");
const webpackMerge = require("webpack-merge");
const webpack = require("webpack");
const friendPlugin = require("friendly-errors-webpack-plugin");
const CopyWbpackPlugin = require("copy-webpack-plugin");

module.exports = webpackMerge(baseConfig, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        host: "0.0.0.0",
        port: 9529,
        contentBase: "dist",
        stats: "errors-only",
        proxy: {
            "/api": {
                //target: "http://182.149.117.160:88/", //刘杰
                // target: "http://172.16.206.226:8080/", //王胜强
                target: "http://172.16.206.128:8080", // 公司内网
                // target: "http://139.155.36.194/",   //田立平
                // target: "http://47.94.1.115:9999/",   // 公司
                // target: "http://172.16.206.238:11100/", //王胜强
                // target: "http://139.155.36.194/", //吴老师
                // target: "http://2fr9632146.eicp.vip/", //外网jhop5
                // target: "http://47.107.138.144/",//外网企管
                // target: "http://172.16.206.240:88",
                // target: 'http://172.16.206.128:32461',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.BASE_URL": "'/api'"
        }),
        new friendPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://127.0.0.1:9529`]
            }
        }),
        new CopyWbpackPlugin([{ from: "static", to: "static" }]),

    ]
});