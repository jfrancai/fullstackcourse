import Togglable from './Toggable'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { BlogForm } from './Form'
import { handleLogout } from '../reducers/userReducer'

const BlogList = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const blogs = useSelector(state => state.blogs)
	const sortedBlogs = [...blogs].sort((a, b) => a.likes < b.likes)

	return (
		<div>
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
		</div>
	)
}

export default BlogList
