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
