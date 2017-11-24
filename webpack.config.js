var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: "./src"
    },
    entry: [
        'babel-polyfill',
        './src/app',
    ],
    output: {
        publicPath: '/',
        filename: 'app.bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            //Babel
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "react"],
                }
            },
            //Sass
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            },
            //images
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=assets/[name].[ext]"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ],
    debug: true
};
