const path = require('path');
const babiliPlugin =  require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

let plugins = [];

plugins.push(new extractTextPlugin('styles.css'));

if (process.env.NODE_ENV == 'production') {
    plugins.push(new babiliPlugin());
}

module.exports = {
    entry:  './app-src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    module: {
        rules: [
            {
                //all file extensions webpack will consider
                test: /\.js$/,
                //webpack will exclude
                exclude: /node_modules/,
                //which loader it will use
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            { 
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader' 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml' 
            }
        ]
    },
    plugins
}