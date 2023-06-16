import { useState } from 'react'
import { createBlog, initBlogs } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/userReducer'
import { Button, Form, Input } from 'antd'
import blogServices from '../services/blogs'

const onFinishFailed = (errorInfo) => {
	console.log('Failed', errorInfo)
}

const LoginForm = () => {
	//const [username, setUsername] = useState('')
	//const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	//const resetFields = () => {
	//	setUsername('')
	//	setPassword('')
	//}

	const onFinish = async ({ username, password }) => {
		dispatch(handleLogin({ username, password }))
	}

	return (
		<Form
			name="basic"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			style={{
				maxWidth: 600,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Username"
				name="username"
				rules={[
					{
						required: true,
						message: 'Please input your username!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
			Submit
				</Button>
			</Form.Item>
		</Form>
	)}

const CommentForm = ({ blogId }) => {
	const [comment, setComment] = useState('')
	const dispatch = useDispatch()

	const addComment = async (event) => {
		event.preventDefault()
		const blogComment = {
			comment,
			blogId
		}
		await blogServices.comment(blogComment)
		dispatch(initBlogs())
		setComment('')
	}

	return (
		<div>
			<form onSubmit={addComment}>
				<div>
					Add comment
					<input
						id='comment'
						type='text'
						value={comment}
						name='Comment'
						onChange={({ target }) => setComment(target.value)}
					/>
				</div>
				<button id='create-comment' type='submit'>add</button>
			</form>
		</div>
	)
}

const BlogForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const dispatch = useDispatch()

	const clearFields = () => {
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	const addBlog = async (event) => {
		event.preventDefault()

		const blog = { title, author, url }
		dispatch(createBlog(blog, clearFields))
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addBlog}>
				<div>
					title
					<input
						id='title'
						type='text'
						value={title}
						name='Title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						id='author'
						type='text'
						value={author}
						name='Title'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						id='url'
						type='text'
						value={url}
						name='Title'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button id='create-blog' type='submit'>create</button>
			</form>
		</div>
	)}

export { LoginForm, BlogForm, CommentForm }
