import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1
		case 'DECREMENT':
			return state - 1
		case 'ZERO':
			return 0
		default: // if none of the above matches, code comes here
			return state
	}
}

const store = createStore(counterReducer)

function App() {
	return (
		<div className="App">
			{store.getState()}
			<div>
				<button onClick={() => store.dispatch({ type: 'INCREMENT'})}>inc</button>
			</div>
			<div>
				<button onClick={() => store.dispatch({ type: 'DECREMENT'})}>dec</button>
			</div>
			<div>
				<button onClick={() => store.dispatch({ type: 'ZERO'})}>zero</button>
			</div>
		</div>
	);
}

export { App, store }
