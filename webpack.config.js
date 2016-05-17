var path = require('path'),
    webpack = require("webpack"),
    libPath = path.join(__dirname, 'lib'),
    buildPath = path.join(__dirname, 'build'),
    appPath = path.join(__dirname, 'source'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


var config = {
    entry: [
        path.join(appPath, 'app.js'),
        path.join(appPath, 'index.css')
    ],
    output: {
        path: path.join(buildPath),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'ng-cache-loader',
            exclude: /node_modules/

        // },
        //     {
        //     test: /\.(png|jpg)$/,
        //     loader: 'file?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        // }, {
        //     test: /\.scss$/,
        //     loader: "style!css!autoprefixer!sass"
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
