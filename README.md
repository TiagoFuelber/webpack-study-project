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
    '$': 'jquery/dist/jquery.js',acka
    'jQuery': 'jquery/dist/jquery.js'
}));
```

## Build optimizing with scope hoisting
This optimization is for production env. 

Inside production `if`, add this: 

```
if (process.env.NODE_ENV == 'production') {
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin())

```
    
## How to split into multiple bundles
You can split into app and vendor, for example.

``` webpack.config
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js'
}));
```

```
entry:  {
    app: './app-src/app.js',
    vendor: ['jquery', 'bootstrap', 'reflect-metadata', ]
},
``` 

```index.html
<script src="dist/vendor.bundle.js"></script>
<script src="dist/bundle.js"></script>
``` 

## How to autogenerate index.html with all the script and style imports
* Install `html-webpack-plugin`

`npm install html-webpack-plugin@2.29.0 --save-dev` 

* Then, transform the actual `index.html` into a template for webpack, removing all script and link tags and renaming it to `main.html`

* Then, remove the `publicPath: 'dist'` config from webpack, because from now the `index.html` will be inside the dist folder.

* Finally, start the plugin in webpack.config: 

```
plugins.push(new HtmlWebpackPlugin({
    hash: true,
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
    },    
    filename: 'index.html',
    template: __dirname + '/main.html'
}));
```

## Module lazy-loading and code-splitting
To let a module be lazy-loaded:
* First, remove the export in the `index.js` of the folder. This technique is called 'barrel'.
* Then, remove all the static imports in all files using that module.
* Install this babel plugin: `npm install babel-plugin-syntax-dynamic-import@6.18.0 --save-dev`, and add to the babel.rc plugins list.
* Use `await`, `desconstruct` and `import` to load the file at the point it is going to be used: 
```
    const { NegociacaoService } = await import('../domain/negociacao/NegociacaoService');
    const service = new NegociacaoService();
```

##How to set some dev and production consts
* Define the const in webpack.config for dev and for production: 
```
const SERVICE_URL = JSON.stringify('http://localhost:3000');

if (process.env.NODE_ENV == 'production') {
    SERVICE_URL = JSON.stringify('http://endereco-da-api');
}
```

* Then configure the plugin: 
```
plugins.push(new webpack.DefinePlugin({ SERVICE_URL }));

``` 
* Now it's possible to use `SERVICE_URL` at any point inside the aplication.