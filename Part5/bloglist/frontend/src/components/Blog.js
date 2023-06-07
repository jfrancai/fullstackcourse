import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
	const blogStyle ={
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 8,
		border: 'solid',
		borderWidth: 1,
		marginBottom:5
	}

	const [visible, setVisible] = useState(false)
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibilty = () => setVisible(!visible)

	return (
		<div style={blogStyle}>
			{blog.title} <button onClick={toggleVisibilty}>{visible ? 'hide' : 'view'}</button>
			<div style={showWhenVisible}>
				Link: <a href={blog.url}>{blog.url}</a><br/>
				Likes: {blog.likes}<button onClick={async () => {
					await blogService.update(blog.id)
					const blogs = await blogService.getAll()
					setBlogs(blogs)
				}
				}>like</button><br/>
				Author: {blog.author}<br/>
				<button onClick={async () => {
					await blogService.remove(blog.id)
					const blogs = await blogService.getAll()
					setBlogs(blogs)
				}
				}>remove</button>
			</div>
		</div>
	)
}

export { Blog }
