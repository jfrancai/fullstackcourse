import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import { LoginForm, BlogForm } from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import { initBlogs, setBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'


const App = () => {
	const [user, setUser] = useState(null)
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)

	useEffect(() => {
		dispatch(initBlogs())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const loginForm = () => < LoginForm setUser={ setUser } />

	const likeBlog = blog => async () => {
		const updatedBlog = await blogService.update(blog.id)
		const blogsCopy = [ ...blogs ]
		const index = blogsCopy.findIndex(b => b.id === updatedBlog.id)
		blogsCopy[index] = updatedBlog
		dispatch(setBlogs(blogsCopy))
	}

	const removeBlog = blog => async () => {
		await blogService.remove(blog.id)
		dispatch(setBlogs(blogs.filter(b => b.id !== blog.id)))
	}

	const blogsList = () => {
		const sortedBlogs = [...blogs].sort((a, b) => a.likes < b.likes)
		return (
			<>
				<h2>blogs</h2>
				<p>{user.username} logged in <button onClick={handleLogout} >log out</button></p>
				<Togglable buttonLabelShow='new blog' buttonLabelHide='cancel'>
					<BlogForm
						blogs={blogs}
						handleLogout={handleLogout}
					/>
				</Togglable>
				<br/>
				<div>
					{sortedBlogs
						.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />) }
				</div>
			</>
		)}

	return (
		<div>
			<Notification />
			{user === null ? loginForm() : blogsList()}
		</div>
	)
}

export default App
