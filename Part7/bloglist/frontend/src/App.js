import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { LoginForm, BlogForm } from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
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
		setNotification({ message: `${ messageToPrint }`, color: `${ messageColor }` })
		setTimeout(() => setNotification({ message: null, color: null }), 3000)
	}


	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const loginForm = () => < LoginForm
		setUser={ setUser }
		notify={notify}
	/>

	const likeBlog = blog => async () => {
		const updatedBlog = await blogService.update(blog.id)
		const blogsCopy = [ ...blogs ]
		const index = blogsCopy.findIndex(b => b.id === updatedBlog.id)
		blogsCopy[index] = updatedBlog
		setBlogs(blogsCopy)
	}

	const removeBlog = blog => async () => {
		await blogService.remove(blog.id)
		setBlogs(blogs.filter(b => b.id !== blog.id))
	}

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
					{blogs
						.sort((a, b) => a.likes < b.likes)
						.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />) }
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
