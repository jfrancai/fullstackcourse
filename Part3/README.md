# Part3

## A) Node.js and Express

We can init a new node project using npm package manager by running `npm init`, then we are ask for a few question that will fill the package.json file for us.

### Simple web server

To start a new npm project

```bash
npm init
```

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
        "start": "node index.js"
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

## C) Saving data to MongoDB

You can use MongoDB Atlas to run MongoDB in the cloud

And instead using official MongoDB Node.js driver we are going to use `mongoose` a higher level library.

```js
npm install mongoose
```

### Important note to Fly.io



Because GitHub is not used with Fly.io, the file .env also gets to the Fly.io servers when the app is deployed. Because of this, the env variables defined in the file will be available there.

However, a better option is to prevent .env from being copied to Fly.io by creating in the project root the file .dockerignore, with the following contents

```bash
.env
```

and set the env value from the command line with the command:

```bash
fly secrets set MONGODB_URI='mongodb+srv://fullstack:<password>@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority'
```

### Moving error handling into middleware

Let's move errors into their own handler using `next`

```js
app.get('/api/notes/:id', (request, response, next) => {  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
```

Express error handlers are middleware that are defined with a function that accepts four parameters. Our error handler looks like this:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)
```

## D) Validation and ESlint

### Validation

We can use schema validation before adding data to MongoDB sheet.

### Lint

Generically, lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.

```bash
npm install eslint --save-dev
```

```bash
npx eslint --init
```
