const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/bloglist')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', {username: 1, name: 1})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const body = request.body

	const users = await User.find({})

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: users[0].id,
	})

	const savedBlog = await blog.save()

	users[0].blogs = users[0].blogs.concat(savedBlog._id)
	await users[0].save()

	response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		{$inc: { likes: 1 } },
		{new: true, runValidators: true, context: 'query'}
	)
	response.json(updatedBlog)
})

module.exports = blogRouter
