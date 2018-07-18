# webpack-study-project

## Install dependencies

#In the client folder
* Base

`npm i --save-dev babel-core webpack`

* Babel loader
It's the middleware between webpack and babel

`npm i --save-dev babel-loader`

* Babili
It's like Uglify but supports ES6 syntax

`npm i --save-dev babili-webpack-plugin`

* Cross-env
Handle env variables cross plataform (win, linux, mac)

`npm i --save-dev cross-env`

In the `build-prod` npm task, add `cross-env NODE_ENV=production` before all.

`"build-prod": "cross-env NODE_ENV=production webpack --config webpack.config.js"` 

* Webpack dev server

`npm i --save-dev webpack-dev-server`

Then, add a new NPM script

`"start": "webpack-dev-server"`

## webpack.config options
`entry`
Apps entry point

`output`
Apps output path

`module`
Contains the rules for the loaders

## loaders

CSS:
Install css-loader and style-loader from NPM and then add the following config: 
```
{
    test: /\.css$/,
    loader: 'style-loader!css-loader'
}
```
Fonts:
Install url-loader and file-loader from NPM and then add the following config: 
```
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
```

##How to get rid of FOUC (Flash Of Unstyled Content)
Install `extract-text-webpack-plugin@3.0.0 --save-dev`. Do not install lower version, because it's buggy.

Import into webpack.config
`const extractTextPlugin = require('extract-text-webpack-plugin');`

Add this before `module.exports`
```
let plugins = [];

plugins.push(new extractTextPlugin('styles.css'));

```

Change the CSS loader: 
```
{
    test: /\.css$/,
    use: extractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
    })
}
```

And add a link to the css file into head on index.html

##How to minify CSS for production
Install `cssnano` and `optimize-css-assets-webpack-plugin` --save-dev

In webpack.config, add this config into the production validation: 
```
plugins.push(new optimizeCSSAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
        discardComments: {
            removeAll: true
        }
    },
    canPrint: true 
}))
```

## How to set a module to be global (jquery, for example)

In webpack.config, import webpack: 
`const webpack = require('webpack')`

and then, add the desired plugin like this: 
```
plugins.push(new webpack.ProvidePlugin({
    '$': 'jquery/dist/jquery.js',
    'jQuery': 'jquery/dist/jquery.js'
}));
```



