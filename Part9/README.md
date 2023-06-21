# Part9

TS offers static code analysis, compile-time type checking and code-level documentation

## A) Background and introduction

### Main principles

TS is a typed superset of JavaScript

* The language
* The compiler (aka transpiler)
* The language service

### TS  key language features

Type annotations

```ts
const getNameAndAge = (name: string, age: number): string => {
    return `${name} you are ${age} years old.`
}
```
Structural typing

an element is considered to be compatible with another if, for each feature within the second element's type, a corresponding and identical feature exists in the first element's type.

Type inference

```ts
const add = (a: number, b: number) => {
  /* The return value is used to determine
     the return type of the function */
  return a + b;
}
```

Type erasure

```ts
// Input
let x: number

// Output
let x
```

## B) First steps with TypeScript

Build steps. Separated TS and JS

We install globaly ts-node and official typescript packages:

```bash
npm install -g ts-node typescript
```

* typescript is the official TS compiler

* ts-node is TypeScript execution engine for Node.js. It allows you to run your TypeScript code directly without precompiling your TypeScript code to JavaScript. ts-node transforms TypeScript to JavaScript in-memory without writing it to disk.


### Setting things up

tsconfig.json

```json
{
    {
        "compilerOptions":{
            "noImplicitAny": false
        }
    }
}
```

### Creating your first own types

We can create a type using the TypeScript native keyword `type` :

```ts
type Operation = 'multiply' | 'add' | 'divide';
```

This type only accept three type of values. We call it a `union type`

This one is built from string litteral types.

It now defines a type aliase

Use `interface` keyword to describe the shape an object should have

```ts
interface Point {
    x: number;
    y: number;
}
```

### Type narrowing

One way to type narrowing is to use `instanceof` keyword

There are many others

### @types/{npm_package}

usually, types for existing packages can be found fromthe @types organization within npm an you can add the relevant types to your project by installing an npm package with the name of your package with a @types/ prefix

Note: Since the typings are only used before compilation, the typings are
t needed in the production build and they should always be in the devDependcies of the package.json


### The alternative array syntax

```ts
let values: number[];

let values: Array<number>;
```

### Another note

somehow surprinsingly TypeScript does not allow to define the same variable in many files at a "block-scope", that is, outside functions (or classes)
This is actually not quite true, This rule applies only to files that are treated as "scripts". A file is a scipt if ti does not contain any export or import statements. If a file has those., Then the file is treated as a module, and the variables do not get defined in the block-scope.

### More about tsconfig

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "moduleResolution": "node"
  }
}
```

[docs here](https://www.typescriptlang.org/tsconfig)

### Adding Express to the mix


```bash
npm install express
```

```bash
npm install --save-dev @types/express
```

### TS Modules

Starting with ECMAScript 2015, JS has a concept of modules. TS shares this concept.

Modules are executed within their own scope, not in the global scope; this means that varibles, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.

note: you can use underscore to get rid of warning for unused variable

We can install hot-reload server like nodemon for ts-node application

```bash
npm install --save-dev ts-node-dev
```

### The horros of any

Now that we have our first endpoints completed, you might notice we have used barely any TypeScript in these small examples. When examining the code a bit closer, we can see a few dangers lurking there.

In TypeScript, every untyped variable whose type cannot be inferred implicitly becomes type any. Any is a kind of "wild card" type which stands for whatever type. Thins become implicitly any type quite often when one forgets to type functions.

There are other methods than tsconfig.json to enforce a coding style. What we can do is use Eslint to manage our code. Let's install Eslint and its TypeScript Extensions.

```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

So now we can configure eslint to disallow explicit any. Write the following rules to .eslintrc

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {

    "@typescript-eslint/no-explicit-any": 2
  }
}
```

## C) Typing an Express app (actual guide to start up a ts project)

One major change from the prvious part is that we're not going to use ts-node anymore. It is a handy tool that helps you get started, but in the long run, it is advisable to use th eofficial TypeScript compiler that comes with the typescript npm-package.

The official compiler generates and packages JavaScript files from the .ts files so that the built production versionwon't contain any TypeScript code anymor. This is the exact outcome we are aiming for since TypeScipt itself is not executable by browsers or Node.

### Setting up the project

```bash
npm install typescript --save-dev
```

Then we can add script to use tsc compiler:

```json
{
  // ..
  "scripts": {

    "tsc": "tsc"
  },
  // ..
}
```

and run it with `npm run tsc -- --init`

note: remember that `--` is nmp way to pass params to the program (here tsc)

here is the example tsconfig.json we are using

```json
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "./build/",
    "module": "commonjs",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true
  }
}
```

-> `target` configuration tells the compiler which ECMAScript version to use when genrating JS.
-> `outDir` tells where the compiled code should be placed.
-> `module` tells the compiler that we want to use CommonJS modules in the compiled code. This means we can use the old require syntax instead of the import one, which not supported in older version of Node, such as version 10.
-> `strict` is a shorthand for multiple separated options: noImplicitAny, noImplicitThis, alwaysStrict, strictBindCallAppply, strictNullChecks, strictFunctionTypes and strictPropertyInitialization. Using strict is suggested by the officail documentation.
-> `noUnusedLocals` prevent having unused local variables
-> `noUnusedParameters` throws an error if a function has unused parameters.
-> `noImplicitReturns` checks all code paths in a function to ensure they return a value.
-> `noFallthroughCasesInSwitch` ensures that, in a switch case, each case ends either with a return or a break statement.
-> `esModuleInterop` allows interoperability between CommonJS and ES Modules; see more in the documentation

deps installation
 
```bash
npm install express
npm install --save-dev eslint @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

package.json

```json
{
  "name": "flight_diary",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "tsc": "tsc"
  },
  "author": "Jane Doe",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^4.17.13",
    "@typescript-eslint/eslint-plugin": "^5.12.1",
    "@typescript-eslint/parser": "^5.12.1",
    "eslint": "^8.9.0",
    "typescript": "^4.5.5"
  },
  "dependencies": {
    "express": "^4.17.3"
  }
}
```

eslintrc

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "plugins": ["@typescript-eslint"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-case-declarations": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

dev server

```bash
npm install --save-dev ts-node-dev
```

and some usefull script

```json
{
  // ...
  "scripts": {
    "tsc": "tsc",

    "dev": "ts-node-dev index.ts",
    "lint": "eslint --ext .ts ."
  },
  // ...
}
```

### Let there be code

We can create a basic ping application using express and test it with `npm run dev`

Now if we want to build the project run `npm run tsc`

Now eslint will also interpret the files in the build folder, we can prevent that with .eslintignore file or add --ext .ts option

This is how to set up a minimal pipeline. 

### Implement the functionality

```json
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "./build/",
    "module": "commonjs",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,

    "resolveJsonModule": true
  }
}
```

`resolveJsonModule` enable importing .json files.

### Utility Types

Sometimes, we might want to use a specific modificaiton of a type. For example, consider a page for listing some data, some of which is sensitive dan some of which is non-sensitive. We might want to be sure that no sensitive data is used or displayed. We could pick the fields of a type we allow to be used to enfore this. We can do that by suing th utility type `Pick`.

The Pick utility type allows us to choose which fields of an existing type we want to use. Pick can be used to either construct a completely new type or to inform a function what it should return on runtime. Utility types are a special knid of type, but they can be used just like regular types.

```ts
const getNonSensitiveEntries =
  (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
    // ...
  }
```

### Preventing an accidental undefined result

- use `undefined` type its any but you can't use it so prevents you from messing up
- use type guarded functions. That means it is a functino that returns a boolean and has a type predicate as the return type. The general form of a type predicate is `parameterName` is `Type` where the `parameterName` is the name of the function parameter and `Type` is the targeted type.

```ts
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
```

### UUID

You can create unique ids of type string using the `uuid` library

```ts
import { v1 as uuid } from 'uuid'
const id = uuid()
```
