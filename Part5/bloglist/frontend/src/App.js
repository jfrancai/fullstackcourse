import { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ notification }) => {
	if (notification.message === null) {
		return (null)
	}
	const style = {
		color: notification.color,
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	return (
		<div style={style} >
			{notification.message}
		</div>
	)
}

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', })
	const [notification, setNotification] = useState({ message: null, color: null, })

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)  
	}, [])

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const notifPrinter = (messageToPrint, messageColor) => {
		setNotification({message: `${messageToPrint}`, color: `${messageColor}`})
		setTimeout(() => setNotification({message: null, color: null}), 3000)
	}

	const loginForm = () => (
		<>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
						<input
							type='text'
							value={username}
							name='Username'
							onChange={({ target }) => setUsername(target.value)}
						/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</>
	)

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
			notifPrinter(error, 'red')
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const addBlog = async (event) => {
		event.preventDefault()

		try {
			const createdBlog = await blogService.create(newBlog)
			console.log(createdBlog)

			setBlogs(blogs.concat(createdBlog))
			setNewBlog({
				title: '',
				author: '',
				url: ''
			})
			notifPrinter(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, 'green')
		} catch (exception) {
			const error = exception.response.data.error
			notifPrinter(error, 'red')
			if (error === 'token expired') {
				handleLogout()
			}
		}
	}

	const blogsList = () => (
		<>
			<h2>blogs</h2>
			<p>{user.username} logged in <button onClick={handleLogout} >log out</button></p>
			<h2>create new</h2>
			<form onSubmit={addBlog}>
				<div>
					title
					<input
						type='text'
						value={newBlog.title}
						name='Title'
						onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value})}
					/>
				</div>
				<div>
					author
					<input
						type='text'
						value={newBlog.author}
						name='Title'
						onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value})}
					/>
				</div>
				<div>
					url
					<input
						type='text'
						value={newBlog.url}
						name='Title'
						onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value})}
					/>
				</div>
				<button type='submit'>create</button>
			</form>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</>
	)

	return (
		<div>
			<Notification notification={notification} />
			{user === null ? loginForm() : blogsList()}
		</div>
	)
}

export default App
