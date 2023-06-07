import { useState } from 'react'
import blogService from '../services/blogs'

const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password
}) => (
  <div>
	<h2>log in to application</h2>
	<form onSubmit={handleSubmit}>
		<div>
			username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={handleUsernameChange}
				/>
		</div>
		<div>
			password
			<input
				type='password'
				value={password}
				name='Password'
				onChange={handlePasswordChange}
			/>
		</div>
		<button type='submit'>login</button>
	</form>
  </div>  
)

const BlogForm = ({
	updateBlogs,
	blogs,
	handleLogout,
	notify,
}) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = async (event) => {
		event.preventDefault()

		try {
			const createdBlog = await blogService.create({
				title: title,
				author: author,
				url: url
			})
			console.log(createdBlog)

			updateBlogs(blogs.concat(createdBlog))
			setTitle('')
			setAuthor('')
			setUrl('')
			notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, 'green')
		} catch (exception) {
			const error = exception.response.data.error
			notify(error, 'red')
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
					type='text'
					value={title}
					name='Title'
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author
				<input
					type='text'
					value={author}
					name='Title'
					onChange={({ target}) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url
				<input
					type='text'
					value={url}
					name='Title'
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type='submit'>create</button>
		</form>
	</div>
)}

export { LoginForm, BlogForm }
