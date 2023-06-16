const blogRouter = require('express').Router()
const Blog = require('../models/bloglist')
const Comment = require('../models/comment.js')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', {username: 1, name: 1})
		.populate('comments')
	response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
	const body = request.body
	const user = request.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id,
	})

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const user = request.user

	user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
	user.save()

	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
	const body = request.body

	const blog = await Blog.findById(request.params.id)

	const comment = new Comment({
		comment: body.comment,
		blogId: blog.id,
	})

	const savedComment = await comment.save()
	blog.comments = blog.comments.concat(savedComment._id)
	blog.save()
	response.status(201).json(savedComment)
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response) => {
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		{$inc: { likes: 1 } },
		{new: true, runValidators: true, context: 'query'}
	)
	response.json(updatedBlog)
})

module.exports = blogRouter
