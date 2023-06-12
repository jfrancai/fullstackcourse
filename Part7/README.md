# Part7

## A) React Router

### Application navigation structure

In an old school web app, changing the page shown by the application would be accomplished by the browser making an http get request to the server and rendering the html representing the view that was returned.

In single-page apps, we are, in reality, always on the same page. The js code run by the browser creates an illusion of different "pages". If http requests are made when switching views., they are only for fetching JSON-formatted data, which the new view might require for it to be shown.

### React router

```bash
npm install react-router-dom
```

```js
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2023</i>
      </div>
    </Router>
  )
}
```

## B) Custom hooks

Example of built in hooks:

- useEffect
- useState

Hook rules:

Don't call Hooks from regular JS functions. Instead, you can:

* Call Hooks from React function components.

* Call Hooks from custom Hooks

Note: create-react-app has the readily-configured rule eslint-plugin-react-hooks that complains if hooks are used in an illegal manner

### Custom hooks

Custom hooks is to facilitate the reuse of the logic used in components.

```js
const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value, 
    increase,
    decrease,
    zero
  }
}
```

Ressources about hooks:

* [Awesome React Hooks Resources](https://github.com/rehooks/awesome-react-hooks)
* [Easy to understand React hook recipes by Gabe Ragland](https://usehooks.com/)
* [Why do React hooks Rely on Call Order?](https://overreacted.io/why-do-hooks-rely-on-call-order/)

## C) More about styles

## Ready made UI libraries

- Bootstrap (reactstrap / react-boostrap)
- Material UI
- Semantic UI React (officail React integration library)

and many mores...

## Styled components

## D) Webpack

### Bundling

It means to put all of the code into one single page.

First we define package.json :
```json
{
  "name": "webpack-part7",
  "version": "0.0.1",
  "description": "practising webpack",
  "scripts": {},
  "license": "MIT"
}
```

Then we can install webpack :

```bash
npm install --save-dev webpack webpack-cli
```

We can now configure webpack in `webpack.config.js`

```js
const path = require('path')

const config = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    }
  }
}

module.exports = config
```

Creation of a build script :

```json
"script": {
    "build": "webpack --mode=development"
}
```

Now we can write our code in src/index.js 

```js
console.log('hello')
```

and run `npm run build`

### Bundling React

```bash
npm install react react-dom
```

Then we can setup React in our application as usual

And we still the build/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript" src="./main.js"></script>
  </body>
</html>
```

If we try to build it will fail, we need loaders.

### Loaders

The error message from webpack states that we may need an appropriate loader to bundle the App.js file correctly. By default, webpack only knows how to deal with plain JavaScript. Although we may have become unaware of it, we are using JSX for rendering our views in React.

webpack.config.js

```js
const path = require('path')

const config = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    },
  }
}

module.exports = config
```

Babel loader installation

```bash
npm install @babel/core babel-loader @babel/preset-react --save-dev
```

Other deps for es6 import module

```bash
npm install core-js regenerator-runtime
```

and import them into index.js

```js
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
```

### Transpilers

Adding `'@babel/presset-env'` to webpack config. It transpile ES6 code to ES5

```bash
npm install @babel/preset-env --save-dev
```

```js
{
  test: /\.js$/,
  loader: 'babel-loader',
  options: {

    presets: ['@babel/preset-env', '@babel/preset-react']
  }
}
```

### CSS

```bash
npm install style-loader css-loader --save-dev
```

```js
{
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react', '@babel/preset-env'],
      },
    },

    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
  ];
}
```

### Webpack dev-server

```bash
npm install --save-dev webpack-dev-server
```

```json
{
  // ...
  "scripts": {
    "build": "webpack --mode=development",

    "start": "webpack serve --mode=development"
  },
  // ...
}
```

```js
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },

  devServer: {
    static: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
  },
  // ...
};
```

### Source maps

webpack devtool to match errro lines

```js
const config = {
  entry: './src/index.js',
  output: {
    // ...
  },
  devServer: {
    // ...
  },

  devtool: 'source-map',
  // ..
};
```

### Minifying the code

Leading tool : UglifyJS

Since webpack v4 just set mode=production to use it

```json
{
  "name": "webpack-part7",
  "version": "0.0.1",
  "description": "practising webpack",
  "scripts": {

    "build": "webpack --mode=production",
    "start": "webpack serve --mode=development"
  },
  "license": "MIT",
  "dependencies": {
    // ...
  },
  "devDependencies": {
    // ...
  }
}
```

### Developmnt and production configuration

We can add some custom webpack plugin that acts like preprocessing to define runtime environment variable

### Polyfill

It gives your application the expected functionality of your runtime. Like `find` method that is not present in Internet Explorer browser...
