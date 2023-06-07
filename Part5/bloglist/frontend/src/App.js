import { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import { LoginForm, BlogForm } from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
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

	const notify = (messageToPrint, messageColor) => {
		setNotification({message: `${messageToPrint}`, color: `${messageColor}`})
		setTimeout(() => setNotification({message: null, color: null}), 3000)
	}

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
			notify(error, 'red')
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const loginForm = () => < LoginForm
			handleSubmit={handleLogin}
			handleUsernameChange={({ target }) => setUsername(target.value)}
			handlePasswordChange={({ target }) => setPassword(target.value)}
		/>

	const blogsList = () => {
		return (
			<>
				<h2>blogs</h2>
				<p>{user.username} logged in <button onClick={handleLogout} >log out</button></p>
				<Togglable buttonLabelShow='new blog' buttonLabelHide='cancel'>
					<BlogForm
						updateBlogs={setBlogs}
						blogs={blogs}
						handleLogout={handleLogout}
						notify={notify}		
					/>
				</Togglable>
				<br/>
				<div>
					{
						blogs.sort((a, b) => a.likes < b.likes).map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />)
					}
				</div>
			</>
	)}

	return (
		<div>
			<Notification notification={notification} />
			{user === null ? loginForm() : blogsList()}
		</div>
	)
}

export default App
