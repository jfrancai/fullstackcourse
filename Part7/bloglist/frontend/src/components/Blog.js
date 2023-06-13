import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog, like } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
	const blogStyle ={
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 8,
		border: 'solid',
		borderWidth: 1,
		marginBottom:5
	}

	const dispatch = useDispatch()

	const [visible, setVisible] = useState(false)
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibilty = () => setVisible(!visible)

	return (
		<div className='blog' style={blogStyle}>
			{blog.title} <button onClick={toggleVisibilty}>{visible ? 'hide' : 'view'}</button>
			<div style={showWhenVisible} className='togglableContent'>
				Link: <a href={blog.url}>{blog.url}</a><br/>
				Likes: {blog.likes}<button onClick={() => dispatch(like(blog.id))}>like</button><br/>
				Author: {blog.author}<br/>
				<button onClick={() => dispatch(removeBlog(blog.id))}>remove</button>
			</div>
		</div>
	)
}

export default Blog
