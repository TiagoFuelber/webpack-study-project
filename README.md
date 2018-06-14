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

## webpack.config options
`entry`
Apps entry point

`output`
Apps output path

`module`
Contains the rules for the loaders
