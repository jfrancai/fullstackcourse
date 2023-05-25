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
