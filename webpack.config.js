var NODE_ENV = process.env.NODE_ENV || 'development';

var path = require('path'),
    webpack = require("webpack"),
    cordovaPath = path.join(__dirname, 'www'),
    buildPath = path.join(__dirname, 'dev/build'),
    appPath = path.join(__dirname, 'dev/source'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


var config = {
    entry: [
        path.join(appPath, 'app.js'),
        path.join(appPath, 'index.css')
    ],
    output: {
        path: NODE_ENV == 'development' ? path.join(buildPath) : path.join(cordovaPath),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'ng-cache-loader',
            exclude: /node_modules/

        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: "ng-annotate?add=true!babel"
        }, {
            test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
            loader: 'file?name=fonts/[name].[ext]'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: pkg,
            template: path.join(appPath, 'index.html')
        }),

        new webpack.optimize.OccurenceOrderPlugin(),

        new webpack.optimize.DedupePlugin()
    ]
};

module.exports = config;
