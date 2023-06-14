import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/userReducer'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const resetFields = () => {
		setUsername('')
		setPassword('')
	}

	const login = async (event) => {
		event.preventDefault()
		dispatch(handleLogin({ username, password }, resetFields))
	}

	return (
		<div>
			<h2>log in to application</h2>
			<form onSubmit={login}>
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

const BlogForm = ({
	handleLogout
}) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const dispatch = useDispatch()

	const clearFields = () => {
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	const addBlog = async (event) => {
		event.preventDefault()

		const blog = { title, author, url }
		dispatch(createBlog(blog, handleLogout, clearFields))
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
