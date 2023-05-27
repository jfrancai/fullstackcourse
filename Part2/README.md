# Part2

## A) Rendering a collection, modules

### JavaScript Arrays

Functional Programming in JavaScript : Higher-order functions, Map, Reduce basics

### Rendering Collections

```js
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <li key={note.id}>{note.content}</li>)}
      </ul>
    </div>
  )
}
```

Because the code generating the li tags is JS, it must be wrapped in curly braces  in a JSX template just like all other JS code

Also, you must be sure to set unique key attribute using keys. Note that the key attribute must be defined in the component mapped here <li> tag but it is not exclusive to it. Just use key attribute to the tag mapped.

Note : Index as key is an anti-pattern

## B) Forms

Web form are a very powerful tool for interacting with users

```js
<form onSubmit={addNote}>
    <input />
    <button type="submit">save</button>
</form>
```

We use event handler `addNote`

```js
const addNote = (event) => {
    event.preventDefault()
}
```

`event.preventDefault` method, which prevent the default action of submiting a form.The default actoni would, among other things, cause the page to reload. The target of the event stored in `event.target`

### Controlled component

An input like `<input />` is uncontrolled. Even if you pass an initial value line `<input defaultValue="Initial text" />`, your JSX only specifies the initial value. It does  not control what the value should be right now.

To render  a controlled input, pass the value prop to it. React will force the input to always have the value you passed. Usually, you would  do this by declaring a `state variable`.

```js
<input value={newNote} onChange={handleNoteChange} />
```

The event handler is called every time a change occurs in the input element.

The `target` property of the event object now correspond to the controlled input elemnet and `event.target.value` refers to the input value of that element


Note: remember to never mutate directly a state variable, always use setState function

### Filtering Displayed Elements

You can use `arr.filter(elt => bool)` to filter out element from an array of elements.

### Create custom handler

```js
const handleSubmit = (setValue) => {
    const handler = (event) => setValue(event.target.value)
    return handler
}
```

This allows you to reuse handle submit to set different state value using different setter.

## C) Getting data from server

You can use JSON server to moke a dev server

```js
npx json-server --port 3001 --watch db.json
```

`XMLHttpRequest` (XHR) objects are used to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing.

The use of XHR is no longer recommended, and browsers already widely support the fetch method, which is based on so called promises, instead of the event-driven model used by XHR.

The event loop :
JavaScript has a runtime model based on an event loop, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. This model is quite different from  models in other languages like C and Java.

JavaScript is single threaded.

fetch() global function :

The global `fetch()` method starts the process of fetching a resouce from the network, returning a promise which is fulfilled once the response is available.

We are using axios instead of fetch :

```js
npm install axios
```

json-server is installed as dev dependency

```js
npm install json-server --save-dev
```

You can add a script to package.json to run the dev server

```js
{
    "scripts": {
        //...
        "server": "json-server -p3001 --watch db.json"
    }
}
```

Your data is in db.json

### Axios and promises

A `Promiese` is an object representing the eventual completion or failure of an asynchronous operation.

In other words, a promise is an object that represents an asynchronous operation. A promise can have three distinct states :

1. The promise is pending

2. The promise is fulfilled

3. The promise is rejected 

### Effect-hooks

The Effect Hook lets you perform side efects on functino components. Data fetching, setting up a subscription, and manually changing the DOM in React compoenents are all examples of side effects. 

```js
const hook = () => {
    const eventHandler = response => setNotes(response.data)
    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
}

useEffect(hook, [])
```

The second param of useEffect is used to specify how often the effect is run, If the second parameter is an empty array [], then the effect is only run along with the first render of the component.
