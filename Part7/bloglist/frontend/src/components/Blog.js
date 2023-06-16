import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { removeBlog, like } from '../reducers/blogReducer'
import { CommentForm } from './Form'

const Blog = () => {
	const blogStyle ={
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 8,
		border: 'solid',
		borderWidth: 1,
		marginBottom:5
	}

	const dispatch = useDispatch()

	const blogs = useSelector(state => state.blogs)
	const id = useParams().id
	const blog = blogs.find(b => b.id === id)
	if (blog === undefined) {
		return null
	}

	return (
		<div className='blog' style={blogStyle}>
			<h2>{blog.title} by {blog.author}</h2><br/>
			Link: <a href={blog.url}>{blog.url}</a><br/>
			Likes: {blog.likes}<button onClick={() => dispatch(like(blog.id))}>like</button><br/>
			added by {blog.user.username}<br/>
			<button onClick={() => dispatch(removeBlog(blog.id))}>remove</button>
			<h2>Comments</h2>
			<CommentForm blogId={blog.id}/>
			<ul>
				{blog.comments.map(comment => {
					return (
						<li key={comment.id}>{comment.comment}</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Blog
