const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/bloglist')
const api = supertest(app)

const initialBlogs = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f9',
		title: 'tata',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 1,
		__v: 0
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})

	initialBlogs.forEach(async (blog) => {
		let blogObj = new Blog(blog)
		await blogObj.save()
	})
})

test('blogs are retruned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(initialBlogs.length)
})

test('Check blog title of a certain blog post', async () => {
	const response = await api.get('/api/blogs')

	const titles = response.body.map(r => r.title)
	expect(titles).toContain('Go To Statement Considered Harmful')
})

test('id exist', async () => {
	const response = await api.get('/api/blogs')

	response.body.map(blog => expect(blog.id).toBeDefined())
})

afterAll(async () => {
	await mongoose.connection.close()
})
