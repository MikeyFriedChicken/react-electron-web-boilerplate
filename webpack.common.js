const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const autoprefixer = require('autoprefixer')

// For our css modules these will be locally scoped
const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: true,
        localIdentName: '[name]_[local]_[hash:base64:5]',
        importLoaders: 2,
        camelCase:true,
        sourceMap: false, // turned off as causes delay
    }
}

// For our normal CSS files we would like them globally scoped
const CSSLoader = {
    loader: 'css-loader',
    options: {
        modules: "global",
        importLoaders: 2,
        camelCase:true,
        sourceMap: false, // turned off as causes delay
    }
}

const PostCSSLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        sourceMap: false, // turned off as causes delay
        plugins: () => [
            autoprefixer({
                browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
            })
        ]
    }
}

const styleLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;
module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true
                      }
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.(sa|sc|c)ss$/,
                use: [styleLoader, CSSLoader, PostCSSLoader, "sass-loader"]
            },
            {
                test: /\.module\.(sa|sc|c)ss$/,
                use: [styleLoader, CSSModuleLoader, PostCSSLoader, "sass-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            },
            {
                test: /vendor\/.+\.(jsx|js)$/,
                loader: "imports?jQuery=jquery,$=jquery,this=>window"
            }

        ]
    },
    plugins: [new HtmlWebpackPlugin({
            title: "React Electron & Web Boilerplate",
            favicon: "assets/favicon.ico",
            template: "public/index.html",
            file: "index.html",
            inject: "body"

        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            defaultSizes: 'gzip'
        })
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 10,
            maxInitialRequests: 10,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                dates: {
                    test: /[\\/]node_modules[\\/](moment-timezones|moment|date-holidays)[\\/]/,
                    priority: -9,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                semantic: {
                    test: /[\\/]semantic[\\/]/,
                    priority: -11,
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                    name: "default"
                },
            },
        },
    }
};