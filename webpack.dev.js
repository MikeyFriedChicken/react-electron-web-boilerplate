const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const path = require('path');
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve("./output/webpack/development"),
        filename: "bundle-web-dev.js",
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        historyApiFallback: true,
        contentBase: "./output/webpack/devserver",
        watchContentBase: true,
        port: 3001,
        overlay: {warnings: false,errors: true},
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            modules: true,
            errorDetails: true

        }
    },
    plugins: [
        new CleanWebpackPlugin(['./output/webpack/development']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify("development")}),
        new webpack.LoaderOptionsPlugin({debug: true}),
        new DashboardPlugin()
    ],
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "eslint-loader",
                    options: {
                        formatter: require("eslint-friendly-formatter"),
                        quiet: false,
                        failOnError: true,
                        failOnWarning: false,
                        emitError: true,
                        emitWarning: true,
                        configFile: "./.eslintrc.json",
                        outputReport: {
                            filePath: 'checkstyle.xml',
                            formatter: require('eslint/lib/formatters/checkstyle')
                          }
                    }
                }
            }
        ]
    }
}
);