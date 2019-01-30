 const merge = require('webpack-merge');
 const webpack = require('webpack');
 const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
 const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 const common = require('./webpack.common.js');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const path = require('path');
 const MinifyPlugin = require("babel-minify-webpack-plugin");

 module.exports = merge(common, {
     mode: 'production',
     output: {
         path: path.resolve("./output/webpack/production"),
         filename: "bundle-web-prod.js"
     },
     devtool: 'source-map',
     plugins: [
         new CleanWebpackPlugin(['./output/webpack/production']),
         new MiniCssExtractPlugin({
             filename: "[name].css",
             chunkFilename: "[id].css"
         }),
         new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
     ],
     optimization: {
         minimizer: [
             new UglifyJsPlugin({
                 uglifyOptions: {
                    output: {
                        comments: /@license/i
                      },
                      compress: {
                        drop_console: true,
                        warnings: false
                      },
                      global_defs: {
                        "@alert": "console.log"
                      }
                 }
             }),
             new OptimizeCSSAssetsPlugin({})
         ]
     },
 });