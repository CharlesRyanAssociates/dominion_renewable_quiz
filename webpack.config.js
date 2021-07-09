const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';

module.exports = (env) => {
    const isProductionBuild = env && env.production;

    return [{
        entry: './src/main.js',
        mode: 'production',
        output: {
            filename: 'quiz.js',
            path: path.resolve(bundleOutputDir),
        },
        optimization: {
            minimize: false
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                }
            ],
        },
        devServer: {
            contentBase: bundleOutputDir
        },
        plugins: [new copyWebpackPlugin([{ from: 'demo/' }])]
    }];
};