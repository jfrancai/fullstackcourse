const Blog = require('../models/bloglist')
const User = require('../models/user')

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

const initialBlogs = [
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5
	},
	{
		title: 'tata',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 1
	}
]

module.exports = {
	initialBlogs,
	usersInDb
}
