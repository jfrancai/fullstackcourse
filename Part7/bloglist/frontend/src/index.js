// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Redux
import { Provider } from 'react-redux'

// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'

// Dependencies
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
		user: userReducer
	}
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)
