# Part6

So far, we have placed the application's state and state logic directly inside React components. When applications grow larger, state management should be moved outside React components. In this part, we will introduce the Redux library, which is currently the most popular solution for managing the state of React applications.

We'll learn about the lightweight version of Redux directly supported by React, namely the React context and useRedux hook, as well as the React Query library that simplifies the server state management.

## A) Flux-architecture and Redux

### Flux-architecture

In Flux, the state is separated from the React components and into its own stores.

Flux offers a standard way for how and where the application's state is kept and how it is modified.

### Redux

Flux but simplier.

Flux architecture : 

When an action changes the state of the sotre, the views are rerendered:

action -> dispatcher -> sotre -> view

If some action on the application, for example pushing a button, causes the need to change the state, the change is made with an action. This causes re-rendering the view again:

                --------------------
               ↓                    |
action -> dispatcher -> store -> view


The whole state of the application is stored in one JS object in the store.

The state of the store is changed with actions. Actions are objects, which have at least a field determining the type of the action.

```bash
npm install redux
```

We create some action like `INCREMENT` inside a Reducer which will manage the state in the redux store

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

When the state of a component is not bounded to the state of the app component

### Action Creator

It's like helper function that handle the call to the store reducer. It allows to abstract the store management away from the frontend logic. Functions that create actions are called action creators.

### Forwarding Redux Store to various components

The question is : How can the App acces the store after moving Redux logic into its own files ? 

One way of doing that is to call hooks Redux API of the react-redux library

```bash
npm install react-redux
```

We can now call the `<Provider store={store}>` component around the `<App/>` component so that it can access the `store` param

Moreover, we can import `{ useSelector, useDispatch }` hooks from this library

- useDispatch can be called with an action creator to update the store state you are interested in

- useSelector allows you to choose which sub-store of the global store you are interested in so you can access it

This way you are able to update the store or get an access to it

## B) Many reducers

### Combined reducers

We can create the actual reducer for our application by combining the two existing reducers with the `combineReducers` functions

```js
import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux' 
import App from './App'

import noteReducer from './reducers/noteReducer'

import filterReducer from './reducers/filterReducer'


const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})


const store = createStore(reducer)

console.log(store.getState())

/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div />
  </Provider>
)
```

Previously the selector function returned the whole state of the store:

```js
const notes = useSelector(state => state)
```

And now it returns only its field notes

```js
const notes = useSelector(state => state.notes)
```

### Redux Toolkit

```bash
npm install @reduxjs/toolkit
```

Actually what we've seen before it quite cumbursome at some point. So, we can use the Redux toolkit to simplify many part of the Redux interaction

For example we can now configure the store with configureStore funciton only and we do not need the combineReducers anymore :

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'


const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

We can also refactor the Reducers, which brings forth the benefits of the Redux Toolkit.
We can easily create reducer and related actoin creators using the `createSlice` function 

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))


const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateId(),
      })
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    }
  },
})
```

If you noticed we've used `push` method in the createNote reducers. This should be forbiden since we must not mutate state of the variable but Redux Toolkit utilizes the Immer library with reducers created by createSlice function, which make it possible to mutate the state argument inside the reducer.

### Redux Toolkit and console.log

Now if you try to print out the state of a reducer you will end up with useless debug console.log in the console. This is due to Immer

Use this instead :

```js
console.log(JSON.parse(JSON.stringify(state)))
```

Note: With Typescript we can achieve immutability without the need of Immer library since it is a typed language

## C) Communicating with server in a redux application

We can use JSONweb server to mock a db and we are using axios to communicate the server.

### Asynchronous actions and Redux thunk

Redux Thung is built in Redux Toolkit

```js
// ...

import noteService from '../services/notes'

const noteSlice = createSlice(/* ... */)

export const { createNote, toggleImportanceOf, setNotes, appendNote } = noteSlice.actions


export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export default noteSlice.reducer
```

```js
// ...

import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeNotes()) 
  }, [dispatch]) 

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}
```

It allows to further detach the frontend logic from the Redux store management

### Asynchronous actions and Redux thunk

It is a good practice to abstract communication with the server away from the ui component. In this implementation, both components would dispatch an action without the need to know about the communication between the server taht happens begind the scenes. Theses kinds of async actions can be implemented usind the Redux Thunk livrary. The use of the livrary doesn't need any additional configuration or even installation when the Redux store is created using the Reux Toolkit's configreStore function.

## D) React Query, useReducer and the context

### Manging data on the server with the React Query library

```bash
npm install react-query
```

### Which state management solution to choose?

In capters 1-5, all state management of the application was done using React's hook useState. Asynchronous calls to the backend required the use of the useEffect hook in some situations. In principle, nothing else is needed.
A subtle problem with a solution based on a state created with the useState hook is that if some part of the application's state is needed by multiple components of the application, the state and the functions for manipulating it must be passed via props to all components that handle the state. Sometimes props need to be passed through multiple components, and the components along the way may not even be interested in the state in any way. This somewhat unpleasant phenomenon is called prop drilling.

Over the years, several alternative solutions have been developed for state management of React applications, which can be used to ease problematic situations (e.g. prop drilling). However, no solution has been "final", all have their own pros and cons, and new solutions are being developed all the time.

The situation may confuse a beginner and even an experienced web developer. Which solution should be used?

For a simple application, useState is certainly a good starting point. If the application is communicating with the server, the communication can be handled in the same way as in chapters 1-5, using the state of the application itself. Recently, however, it has become more common to move the communication and associated state management at least partially under the control of React Query (or some other similar library). If you are concerned about useState and the prop drilling it entails, using context may be a good option. There are also situations where it may make sense to handle some of the state with useState and some with contexts.

The most comprehensive and robust state management solution is Redux, which is a way to implement the so-called Flux architecture. Redux is slightly older than the solutions presented in this section. The rigidity of Redux has been the motivation for many new state management solutions, such as React's useReducer. Some of the criticisms of Redux's rigidity have already become obsolete thanks to the Redux Toolkit.
