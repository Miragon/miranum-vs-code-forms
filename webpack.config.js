//@ts-check

'use-strict';

const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
const config = {
    target: 'webworker',
    context: path.resolve(__dirname, 'src-ext'),
    entry: './extension.ts',
    output: {
        path: path.resolve(__dirname, 'dist', 'js'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        mainFields: ['browser', 'module', 'main'],
        extensions: ['.ts', '.js'],
        alias: {
            lib: path.resolve(__dirname, 'src-ext', 'lib')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    }
};
module.exports = config;
