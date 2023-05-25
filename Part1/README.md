# Introduction to React

First, we can start a react project using create-reac-app. Run the following command `npx create-react-app part1` then `cd part1` and `npm start` and go to http://localhost:3000

## Component

Components are one of the core concepts of React. They are the foundation up on which you build user interfaces (UI), which makes them the perfect place to start your React journey!

## Arrow functions

An arrow function expression is a compact alternative to a traditional function expression, with some semantic diffenrences and deliberate limitationsin usage.

## JSX

JSX is a syntax extension fo JavaSCript that lets you write HTML-like markup inside a JavaScript file.

The create-react-app use Babel to compile JSX to HTML under the hood.

JSX's tags needs to be closed.

## Passing Props to a Component

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

## Fragment

`<Fragment>`, often used via `<> ... </>` syntax, lets you group elements without a wrapper node


## Do not render objects

In React, the individual things rendred in braces must be primitive values, such as numbers or strings.

React also allows arrays to be rendered if the array contains values that are eligible for rendering (such as numbers or strings).
