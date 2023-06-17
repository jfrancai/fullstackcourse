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
