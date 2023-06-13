import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
