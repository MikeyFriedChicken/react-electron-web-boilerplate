const merge = require('webpack-merge');
const prodWebpack = require('./webpack.prod.js');
const webpack = require("webpack");
const path = require('path');
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    spawn
} = require('child_process');
const OUTPUT_DIR = path.resolve(__dirname, 'electron/prod/dist');

module.exports = merge(prodWebpack, {
    output: {
        path: OUTPUT_DIR,
        publicPath: './',
        filename: 'bundle-electron-prod.js'
    },
    target: 'electron-renderer',
    devServer: {
        contentBase: OUTPUT_DIR,
        before() {
            spawn(
                    'electron',
                    ['.'], {
                        shell: true,
                        env: process.env,
                        stdio: 'inherit'
                    }
                )
                .on('close', code => process.exit(0))
                .on('error', spawnError => console.error(spawnError))
        }
    }
});

//console.log(JSON.stringify(module.exports, null, '\t'));