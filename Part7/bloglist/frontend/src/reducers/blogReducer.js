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
			return action.payload
		},
		delBlog(state, action) {
			return state.filter(b => b.id !== action.payload)
		},
		likeBlog(state, action) {
			state.find(b => b.id === action.payload).likes += 1
			return  state
		}
	}
})

export const { setBlogs, appendBlog, delBlog, likeBlog } = blogSlice.actions
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

export const removeBlog = (id) => {
	return async dispatch => {
		try {
			await blogServices.remove(id)
			dispatch(delBlog(id))
		} catch (exception) {
			console.log(exception.response.data.error)
		}
	}
}

export const like = (id) => {
	return async dispatch => {
		try {
			await blogServices.update(id)
			dispatch(likeBlog(id))
		} catch (exception) {
			console.log(exception.response.data.error)
		}
	}
}
