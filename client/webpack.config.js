const path = require('path');
const babiliPlugin =  require('babili-webpack-plugin');

let plugins = [];

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
            }
        ]
    },
    plugins
}