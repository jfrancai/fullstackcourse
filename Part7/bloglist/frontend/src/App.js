import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import { LoginForm, BlogForm } from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import { initBlogs } from './reducers/blogReducer'
import { addUser, handleLogout, setUser, } from './reducers/userReducer'


const App = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(initBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(addUser())
	}, [])

	const loginForm = () => < LoginForm setUser={ (user) => dispatch(setUser(user)) } />

	const blogsList = () => {
		const sortedBlogs = [...blogs].sort((a, b) => a.likes < b.likes)
		return (
			<>
				<h2>blogs</h2>
				<p>{user.username} logged in <button onClick={() => dispatch(handleLogout())} >log out</button></p>
				<Togglable buttonLabelShow='new blog' buttonLabelHide='cancel'>
					<BlogForm
						blogs={blogs}
					/>
				</Togglable>
				<br/>
				<div>
					{sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} />) }
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
