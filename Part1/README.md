# Part1

## A) Introduction to React

First, we can start a react project using create-reac-app. Run the following command `npx create-react-app part1` then `cd part1` and `npm start` and go to http://localhost:3000

### Component

Components are one of the core concepts of React. They are the foundation up on which you build user interfaces (UI), which makes them the perfect place to start your React journey!

### Arrow functions

An arrow function expression is a compact alternative to a traditional function expression, with some semantic diffenrences and deliberate limitationsin usage.

### JSX

JSX is a syntax extension fo JavaSCript that lets you write HTML-like markup inside a JavaScript file.

The create-react-app use Babel to compile JSX to HTML under the hood.

JSX's tags needs to be closed.

### Passing Props to a Component

React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props.

Basic react component using props:

```js
const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}
```

Note : React component must be capitalized.

### Fragment

`<Fragment>`, often used via `<> ... </>` syntax, lets you group elements without a wrapper node


### Do not render objects

In React, the individual things rendred in braces must be primitive values, such as numbers or strings.

React also allows arrays to be rendered if the array contains values that are eligible for rendering (such as numbers or strings).

## B) Javascript

### ECMAScript

[ECMAScript](https://262.ecma-international.org/13.0/) is a JavaScript standard intended to ensure the interoperability of web pages across different web browsers

### Variables

```js
const x = 1
let y = 5

y += 10
y = 'sometext'
x = 4 // causes an error
```

### Arrays

```js
const t = [1, -1, 3]

t.push(5) // use concat instead

console.log(t.length)
console.lot(t[1])

t.forEach(value => {
    console.log(value)
})
```

The content of a const array can be changed, not the array itself

In React it is better to not change the original object we were working on. So, it is better to use `concat` method instead of push

Another array method : map

```js
const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
```

You can use destructuring to assign array values to variables :

```js
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)
console.log(rest)
```

### Objects

Object literals : 

```js
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5,
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}
```

The properties of an object are referenced by using the "dot" notation or brackets like for arrays

You can also add properties to an object on the fly by eiter using dot notation or brackets;

### Functions

Arrow functions :

```js
const sum (p1, p2) => {
    return p1 + p2
}
```

Using the function declaration keyword : 

```js
function product(a, b) {
    return a * b
}
```

Using the function expression keyword :

```js
const average = function(a, b) {
return (a + b) / 2
}
```

### Object methods and "this"

Contrary to other languages, in JavaScript the value of this is defined based on how the method is called.

`This` does not exist in arrow function

### Classes

There are features to make "simulating" object-oriented classes possible in JavaScript.

Classes are a template for creating objects. They encapsulate data with code to work on that data. Classes in JS are built on prototypes but also have some syntax and semantics that are unique to classes.

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()

const janja = new Person('Janja Garnbret', 23)
janja.greet()
```

## C) Component state, even handlers

### Destructuring

```js
props = {
    name: 'Arto Hellas',
    age: 24,
}
```

So we don't even need props any more :

```js
const Hello = ({ name, age }) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

### Page re-rendering

```js
import { useState } from 'react'

const [ counter, setCounter ] = useState(0)
```

### Event handling

An event handler is a function

```js
<button onClick={() => setCounter(counter + 1)}> 
  plus
</button>
```

### Passing state to child components

It is a best practice to wrote small react component and lift up states to the closest common ancestor
