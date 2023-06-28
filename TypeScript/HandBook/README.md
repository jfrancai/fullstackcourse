# The Basics

JS only provides dynamic typing only. This is a problem since we cannot prevent crash at runtimeThis is a problem since we cannot prevent crash at runtime. TypeScript provides static typing.

## Static type-checking

It helps us find bugs before our code runs. Static types systems describe the shapes and behaviors of what our values will be when we run our programs.

## Non-exception Failures

TS throw errors when our code does not follow ESMAScript specification as well. And other error possibilities like uncalled functions, missing argument object call, typos and more.

## Tpes for Tooling

The type-checker can suggest which properties you might want to use.
Go to definition, finding refs and more also come on top of the type-checker.

## tsc, the TypeScript compiler

For global installation:

```bash
npm install -g typescript
```

```bash
tsc hello.ts
```

This output a .js file

We can use the `--noEmitOnError` flag to prevent tsc to ouput a file if any errors occured

## Explicit Types

```ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
 
greet("Maddison", new Date());
```

## Erased Types

Types are erased in the outputed js file

## Downleveling

The process of converting to different/older version of ES. Like ES6 -> ES5

We can set this option using the `--target` of tsc

## Stricness

Use the `strict` flag to enable a wide range of type checking behavior that results in stronger guarantees of program correctness.

The seven options:

* noImplicitAny: Disable implicit typing

* noImplicitThis

* alwaysStrict

* strictBindCallApply

* strictNullChecks: Flag that makes handling `null` and `undefined` more explicit, and spares us from worrying about whether we forget to handle them.

* strictFunctionTypes

* strictPropertyInitialization

# Everyday Types

## The primitives

string, number, boolean

## Arrays

The `type[]` notation:

For example with the primitives: `number[]`, `string[]`, `boolean[]`

The generic form `Array<type>`.

They are the same thing but not using the same feature of the compiler.

## any

TS special type `any`, when you don't want type checking for a variable.

The any type is useful when yo don't want to write out a long type just to convince TypeScript that a particular line of code is okay.

## Type Annotations on Variables

```ts
let myName: string = 'Alice';
```

## Functions

### Parameter Type Annotations

```ts
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

### Return Type Anotations

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

### Anonymous Functions

```ts
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});
```

TypeScript use contextual typing to determine the s' type.
