# Part4

## A) Login in frontend
## B) props.children and proptypes

### Proptypes

The expected and required props of a component can be defined with the prop-types package. Let's install the package:

```bash
npm install prop-types
```

## C) Testing React apps

There are many different ways of testing React applications. Let's take a look at them next.

In addition to Jest form the previous part, we also need another testing livrary that will help us render components for testing purposes. The current best ption for this is react-testing-library which has seen rapid growth in popularity recent times.

Let's install the library with the command:

```bash
npm install --save-dev testing-library/react @testing-library/jest-dom
```

Also jest-dom provide some helper methods.

We can use `className` to identify components in the DOM.

### Rendering the component for tests

```js
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})
```

### Running tests

Test are generally run under watch mode.

```bash
npm test
```

If you do not want watch mode run:

```bash
CI=true npm test
```

### Test ile location

In React there are (at least) two different conventions for the test file's location.

Component.test.js next to the tested component file or in a dedicated directory with the same file name.

By default create-react-app use the first method

### Searching for content in a component

There are many ways to investgate component with react-testing-library package.

### Debugging tests

We can use the debug method from the screen object, it prints the html in the console.

```js
screen.debug()

screen.debug(element)
```

### Clicking buttons in tests

Let us install a library user-event that makes simulating user input a bit easier:

```bash
npm install --save-dev @testing-library/user-event
```

```js
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import Note from './Note'

// ...

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
```

### Test coverage

```bash
CI=true npm test -- --coverage
```

## D) End to end testing

### Cypress

```bash
npm install --save-dev cypress
```

```js
{
  // ...
  "scripts": {
  // ...
    "cypress:open": "cypress open",
    "start:test": "NODE_ENV=test node index.js"
  // ...
  }
}
```

Unlike the frontend's unit tests, Cypress tests can be in the frontend or the backend repository, or even in their separate repository.

