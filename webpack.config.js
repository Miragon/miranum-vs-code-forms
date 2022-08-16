//@ts-check

'use-strict';

const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require("vue-loader");

/**@type {import('webpack').Configuration}*/
const config = {
    target: 'webworker',
    entry: ['./src-ext/extension.ts', './src/main.ts'],
    output: {
        path: path.resolve(__dirname, 'dist', 'js'),
        filename: '[name].bundle.js',
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
        fallback: {
            util: require.resolve('util')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        options: {
                            implementation: require('sass'),
                            indentedSyntax: true // optional
                        },
                        // Requires >= sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            }
        ]
    }
};
module.exports = config;
