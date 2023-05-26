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
