const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/bloglist')
const User = require('../models/user')

describe('basic blogs tests', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })
		
		await user.save()

		for (let blog of helper.initialBlogs) {
			let blogObj = new Blog(blog)
			await blogObj.save()
		}
	})

	test('blogs are retruned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
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

	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'titi at the beach',
			author: 'titi',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 7
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')

		const titles = response.body.map(r => r.title)
		expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
		expect(titles).toContain('titi at the beach')
	})

	test('likes set to 0 if missing in post request', async () => {
		const newBlog = {
			title: 'titi at the beach',
			author: 'titi',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const blog = response.body.find(r => r.author === 'titi')

		expect(blog.likes).toBe(0)
	})

	test('blog with title or url missing are not accepted', async () => {
		const missingTitleBlog = {
			author: 'titi',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
		}

		const missingUrlBlog = {
			title: 'titi at the beach',
			author: 'titi',
		}

		await api
			.post('/api/blogs')
			.send(missingTitleBlog)
			.expect(400)

		await api
			.post('/api/blogs')
			.send(missingUrlBlog)
			.expect(400)

		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('deletion of a blog', async () => {
		let response = await api.get('/api/blogs')
		const blogsAtStart = response.body
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		response = await api.get('/api/blogs')

		const blogsAtEnd = response.body
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

		const titles = blogsAtEnd.map(r => r.titles)
		expect(titles).not.toContain(blogToDelete.title)
	})

	test('updating a note', async () => {
		let response = await api.get('/api/blogs')
		const blogToUpdate = response.body[0]

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send()	
			.expect(200)

		response = await api.get('/api/blogs')
		expect(response.body[0].likes).toBe(blogToUpdate.likes + 1)
	})
})

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })
		
		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'jfrancai',
			name: 'Julien',
			password: 'passwrd',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already take', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'sekret'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		expect(result.body.error).toContain('expected `username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('password too short', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'jfrancai',
			name: 'Julien',
			password: 'pwd',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).not.toContain(newUser.username)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
