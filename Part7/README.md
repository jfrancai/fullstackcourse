# Part7

## A) React Router

### Application navigation structure

In an old school web app, changing the page shown by the application would be accomplished by the browser making an http get request to the server and rendering the html representing the view that was returned.

In single-page apps, we are, in reality, always on the same page. The js code run by the browser creates an illusion of different "pages". If http requests are made when switching views., they are only for fetching JSON-formatted data, which the new view might require for it to be shown.

### React router

```bash
npm install react-router-dom
```

```js
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2023</i>
      </div>
    </Router>
  )
}
```

## B) Custom hooks
