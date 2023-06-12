import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {
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
		<div className='blog' style={blogStyle}>
			{blog.title} <button onClick={toggleVisibilty}>{visible ? 'hide' : 'view'}</button>
			<div style={showWhenVisible} className='togglableContent'>
				Link: <a href={blog.url}>{blog.url}</a><br/>
				Likes: {blog.likes}<button onClick={likeBlog(blog)}>like</button><br/>
				Author: {blog.author}<br/>
				<button onClick={removeBlog(blog)}>remove</button>
			</div>
		</div>
	)
}

export default Blog
