import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import { notify } from './notificationReducer'

const blogSlice = createSlice({
	name: 'blog',
	initialState: [],
	reducers: {
		appendBlog(state, action) {
			state.push(action.payload)
			return state
		},
		setBlogs(state, action) {
			state = action.payload
			return state
		}
	}
})

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer

export const initBlogs = () => {
	return async dispatch => {
		const blogs = await blogServices.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = (blog, handleLogout, clearFields) => {
	return async dispatch => {
		try {
			const createdBlog = await blogServices.create(blog)
			dispatch(appendBlog(createdBlog))
			dispatch(notify(
				`a new blog ${createdBlog.title} by ${createdBlog.author} added`
				, 'green'
			))
			clearFields()
		} catch (exception) {
			const error = exception.response.data.error
			dispatch(notify(error, 'red'))
			if (error === 'token expired') {
				handleLogout()
			}
		}
	}
}
