import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import { notify } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const LoginForm = ({
	setUser,
}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			const error = exception.response.data.error
			dispatch(notify(error, 'red'))
		}
	}

	return (
		<div>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						id="username"
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						id='password'
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id='login-button' type='submig'>login</button>
			</form>
		</div>
	)}

LoginForm.propTypes = {
	setUser: PropTypes.func.isRequired
}

const BlogForm = ({
	updateBlogs,
	blogs,
	handleLogout
}) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const dispatch = useDispatch()

	const addBlog = async (event) => {
		event.preventDefault()

		try {
			const createdBlog = await blogService.create({
				title: title,
				author: author,
				url: url
			})

			updateBlogs(blogs.concat(createdBlog))
			setTitle('')
			setAuthor('')
			setUrl('')
			const msg = `a new blog ${createdBlog.title} by ${createdBlog.author} added`
			dispatch(notify(msg, 'green'))
		} catch (exception) {
			const error = exception.response.data.error
			dispatch(notify(error, 'red'))
			if (error === 'token expired') {
				handleLogout()
			}
		}
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addBlog}>
				<div>
					title
					<input
						id='title'
						type='text'
						value={title}
						name='Title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						id='author'
						type='text'
						value={author}
						name='Title'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						id='url'
						type='text'
						value={url}
						name='Title'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button id='create-blog' type='submit'>create</button>
			</form>
		</div>
	)}

export { LoginForm, BlogForm }
