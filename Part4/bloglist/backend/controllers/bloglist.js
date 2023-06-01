const blogRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog .find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const body = request.body

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
	})

	const result = await blog.save()
	response.status(201).json(result)
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
