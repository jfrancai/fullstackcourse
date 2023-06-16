import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import { notify } from './notificationReducer'
import { handleLogout } from './userReducer'

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
		try {
			const blogs = await blogServices.getAll()
			dispatch(setBlogs(blogs))
		} catch (exception) {
			const error = exception.response.data.error
			if (error === 'token expired') {
				dispatch(handleLogout())
			}
			dispatch(notify(error, 'red'))
		}
	}
}

export const createBlog = (blog, clearFields) => {
	return async dispatch => {
		try {
			const createdBlog = await blogServices.create(blog)
			dispatch(appendBlog(createdBlog))
			dispatch(initBlogs())
			dispatch(notify(
				`a new blog ${createdBlog.title} by ${createdBlog.author} added`
				, 'green'
			))
			clearFields()
		} catch (exception) {
			const error = exception.response.data.error
			if (error === 'token expired') {
				dispatch(handleLogout())
			}
			dispatch(notify(error, 'red'))
		}
	}
}

export const removeBlog = (id) => {
	return async dispatch => {
		try {
			await blogServices.remove(id)
			dispatch(delBlog(id))
		} catch (exception) {
			const error = exception.response.data.error
			if (error === 'token expired') {
				dispatch(handleLogout())
			}
			dispatch(notify(error, 'red'))
		}
	}
}

export const like = (id) => {
	return async dispatch => {
		try {
			await blogServices.update(id)
			dispatch(likeBlog(id))
		} catch (exception) {
			const error = exception.response.data.error
			if (error === 'token expired') {
				dispatch(handleLogout())
			}
			dispatch(notify(error, 'red'))
		}
	}
}
