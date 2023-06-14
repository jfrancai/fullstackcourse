import { createSlice } from '@reduxjs/toolkit'
import { notify } from './notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			state = action.payload
			return state
		},
		unsetUser(state) {
			state = null
			return state
		}
	}
})

export const { setUser, unsetUser } = userSlice.actions
export default userSlice.reducer

export const addUser = () => {
	return async dispatch => {
		const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		}
	}
}

export const handleLogout = () => {
	return dispatch => {
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(unsetUser())
	}
}

export const handleLogin = (user, resetFields) => {
	return async dispatch => {
		try {
			const loggedUser = await loginService.login(user)
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(loggedUser)
			)
			blogService.setToken(loggedUser.token)
			dispatch(setUser(loggedUser))
			resetFields()
		} catch (exception) {
			const error = exception.response.data.error
			dispatch(notify(error, 'red'))
		}
	}
}
