import Togglable from './Toggable'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { BlogForm } from './Form'

const BlogList = () => {
	const blogs = useSelector(state => state.blogs)
	const sortedBlogs = [...blogs].sort((a, b) => a.likes < b.likes)

	return (
		<div>
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
