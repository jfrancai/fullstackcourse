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

## B) Deploying app to internet

### Same origin policy and CORS

If the ressources fetched by the server came from another URL than the request, browser will have to check the `Access-Control-Allow-Origin` response header.

Let's install the `cors` middleware :

```bash
npm install cors
```

```js
const cors = require('cors')

app.use(cors())
```

### Application to the internet

Services to deploy cloud application:

- Fly.io
- Render
- Heroku

### Fly.io

First, instlal Fly.io, then run `fly auth login`

Once you are logged in, at the root of your backend app run :

```bash
fly launch
```

Set the port accordingly to your app in fly.toml

Then :

```bash
fly deploy
fly open
```

Run `fly deploy` each time you want to update your remote application

You can use `flyctl ping -o <app-name>` to ping the remote machine

### Frontend production build

Run `npm run build` with create-react-app.

Then it produce a build folder that we can put into the backend folder, it is a minified version of the app

Now, we need to tell the backend where to look for this build folder, using express it can be done using another middleware :

```js
app.use(express.static('build'))
```

Some usefull fly scripts : 

```js
{
  "scripts": {
    // ...
    "build:ui": "rm -rf build && cd ../part2-notes/ && npm run build && cp -r build ../notes-backend",
    "deploy": "fly deploy",
    "deploy:full": "npm run build:ui && npm run deploy",    
    "logs:prod": "fly logs"
  }
}
```

Note: If you changed the url of the front application to a relative url like `/api/notes` instead of a full adress like `http://localhost:3000/api/notes` and that your backend runs on a different port, you are going to have some connection problems. You can fixe that by using a proxy with create-react-app :

```js
{
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"
}
```
