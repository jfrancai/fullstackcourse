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

## Object Types

```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

You can use `,` or `;` to separate the properties, and the last separator is optionale either way.

### Optional Properties

use `?` to specify that a property is optional.

The type part of a property is optional, not specifying it result in `any` type for that property.

Important note:

In js, accessing a property that does not exist return `undefined` so when using option property we have to check if the propert exist or not

```ts
const Dog = (dog: { name: string, age?: number }) => {
    console.log(name);
    if (dog.age !== undefined) {
        console.log(age);
    }
};
```

## Defining a Union type

Create a union type by using the pipe `|` operator.

```ts
const printId = (id: number| string) => {
    console.log(id);
}
```

## Working with Union Types

You will have to narrow the type of a union type. Meaning that you will have check what type you received from the different union possibilities

## Type Aliases

```ts
type Point = {
    x: number;
    y: number;
};
```

## Interfaces

```ts
interface Point {
    x: number;
    y: number;
}
```

## Differences Between Type Aliases and Interfaces

Use inteface until you need to use features from type.

## Type Assertions

Type assertion can be done using the `as [type]` keyword.

Type assertion are removed at conpiled so js does not know about the type at run time like for type annotations. So, there won't be an exception or null generated if the type assertion is wrong.

## Literal Types

You can use literals to build types, so it can only take some values:

```ts
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
```

```ts
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

There are two boolean literal types: `true` and `false`. The boolean type is actually an alias for the union `true | false`

### Literal Inference

see main.ts `handleRequest` function

## `null` and `undefined`

The access to null and undefined depends on structNullChecks option

With strictNullChecks on you will have to narrow the type to be sure that you can't have a null or undefined value (using a if for example).

### Non-null Assertion Operator (Postfix !)

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```
