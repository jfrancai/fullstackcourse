# Part3

## A) Node.js and Express

We can init a new node project using npm package manager by running `npm init`, then we are ask for a few question that will fill the package.json file for us.

### Simple web server

Here we are using `http` Node js package. It's like vanilla Node.js
```js
const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

Note: NodeJS use CommonJS modules by default (so the `require` keyword to import packages) instead of ES6 import notation

### Express package

Express is the most popular library to implement a Nodejs server without doing a pure vanilla server.

```js
npm install express
```

We can update deps using `npm update` and install deps using `npm install`

### nodemon

nodemaon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

```js
npm install --save-dev nodemon
```

Add it to npm scripts inside package.json

```js
{
    "scripts": {
        //...
        "dev": "nodemon index.js"
    }
}
```

Then start nodemon with `npm run dev`

###  REST (Representational State Transfer)

* the URI of one or several resources used a starting points, sometimes called endpoints or entry points
* the encoding of all possible resource representations (which will include representation of the data and of the hypermedia links for state transitions)
* the possible state transitions and where they can occur

### Middleware

Middleware are functions that can be used for handling request and response objects.

Middleware is a function that receives three parameters:

```js
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
```

Middleware is taken into use like this:

```js
app.use(requestLogger)
```

Middleware can be added before or after our routes, depending on when we want them to be called.

Note: `morgan` provide some nice logs for node servers.
