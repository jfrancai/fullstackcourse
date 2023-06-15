import Togglable from './Toggable'
import { useSelector } from 'react-redux'
import { BlogForm } from './Form'
import { Link } from 'react-router-dom'

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
				<ul>
					{sortedBlogs.map(blog => {
						return (
							<Link key={blog.id} to={`/blogs/${blog.id}`}>
								<li>
									{blog.title}
								</li>
							</Link>
						)}
					)}
				</ul>
			</div>
		</div>
	)
}

export default BlogList
