
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