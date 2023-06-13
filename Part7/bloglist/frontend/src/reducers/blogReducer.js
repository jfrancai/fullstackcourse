import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import { notify } from './notificationReducer'

const blogSlice = createSlice({
	name: 'blog',
	initialState: [],
	reducers: {
		append(state, action) {
			state.push(action.payload)
			return state
		},
		set(state, action) {
			state = action.payload
			return action.payload
		},
		del(state, action) {
			return state.filter(b => b.id !== action.payload)
		},
		like(state, action) {
			state.find(b => b.id === action.payload).likes += 1
			return  state
		}
	}
})

export const { set, append, del, like } = blogSlice.actions
export default blogSlice.reducer

export const initBlogs = () => {
	return async dispatch => {
		const blogs = await blogServices.getAll()
		dispatch(set(blogs))
	}
}

export const createBlog = (blog, handleLogout, clearFields) => {
	return async dispatch => {
		try {
			const createdBlog = await blogServices.create(blog)
			dispatch(append(createdBlog))
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
			dispatch(del(id))
		} catch (exception) {
			console.log(exception.response.data.error)
		}
	}
}

export const likeBlog = (id) => {
	return async dispatch => {
		try {
			await blogServices.update(id)
			dispatch(like(id))
		} catch (exception) {
			console.log(exception.response.data.error)
		}
	}
}
