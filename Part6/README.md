
# Part4

So far, we have placed the application's state and state logic directly inside React components. When applications grow larger, state management should be moved outside React components. In this part, we will introduce the Redux library, which is currently the most popular solution for managing the state of React applications.

We'll learn about the lightweight version of Redux directly supported by React, namely the React context and useRedux hook, as well as the React Query library that simplifies the server state management.

## A) Flux-architecture and Redux

### Flux-architecture

In Flux, the state is separated from the React components and into its own stores.

Flux offers a standard way for how and where the application's state is kept and how it is modified.

### Redux

Flux but simplier.

The whole state of the application is stored in one JS object in the store.

The state of the store is changed with actions. Actions are objects, which have at least a field determining the type of the action.

```js
import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
```

Note: createStore is depreciated. Not the best way to go but still work fine.

Note: 

```js
{
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
}
```

There is a type and a payload.
The choice of the field name is not random. The general convention is that actions have exactly two fields, type telling the type and payload containing the data included with the Action.


### Pure functions immutable

- Reducer function must be pure function:

 1) the function return values are identical for  identical arguments
 2) the function has no side effects

- A reducer  state must be  composed  of immutable objects.

Note: We can use `deep-freeze` papckage to ensure immutability

Test example :

```js
import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      payload: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })
})
```

### Controlled vs un Uncontrolled React component
