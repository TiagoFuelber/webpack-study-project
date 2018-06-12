const path = require('path');

module.exports = {
    entry:  './app-src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
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
    }
}