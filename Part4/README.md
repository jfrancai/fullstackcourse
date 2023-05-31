
# Part4

Note:

```bash
npm install dotenv
```

Then you can use it with, `require('dotenv').config()` and you can access your env variable via `process.env.MY_VAR_HERE`

## A) Structure of backend apllication, introduction to testing

Best practice

```
├── index.js
├── app.js
├── build
│   └── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
```

Instead of using console.log everywhere in our app, we are going to add the logger.js file that purpose is going to log server's info :

```js
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}
```

The index.js file only imports the actual application from the app.js file and then starts the application. The function fino of the logger-module is used for console printout telling that the applicaiton is running.

```js
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
```

The handling of environment variables is extracted into a separate utils/config.js file:

```js
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
```

The other parts of the application can access the environment variables by importing the configuration module:o

```js
const config = require('./utils/config')

logger.info(`Server running on port ${config.PORT}`)
```

Routes have also been moved to their own modules.

### Testing Node application

We are going to use Jest as a testing js library

```bash
npm install jest --save-dev
```

We can add the following script to package.json file :

```js
"test": "jest --verbose"
```

Then, we have to specify the testing environment : 

```js
{
 //...
 "jest": {
   "testEnvironment": "node"
 }
}
```

Now we can create a tests directory, under which we are going to add test files.

## B) Testing the backend

### Test environment

Since our application is going to run in a certain environment we can set the `NODE_ENV` variable depending what we are doging : 

We also install cross-env so that the app work on Windows

```bash
npm install cross-env --save-dev
```

note: if you deploy on Fly.io install cross-env as a production deps

```js
{
  // ...
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    // ...
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
  },
  // ...
}
```

### supertest

```bash
npm install --save-dev supertest
```

```js
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000) // here we can chage timeout value of the test

afterAll(async () => {
  await mongoose.connection.close()
})
```

The test imports the Express application from the app.js module and wraps it with the supertest function into a so-called speragent object. This object is assigned to the api variable and tests can use it for making HTTP requests to the backend.

Once all the tests have finished  running  we have to close the database  connection used by Mongose. This can be easily achieved with the afterAll method.

### Initializing the database before tests

We can use `beforeEach` function to setup the database for example :

