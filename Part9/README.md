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








