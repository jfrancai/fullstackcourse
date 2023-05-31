const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	const blogs = [
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
		},
		{
			_id: '5a422aa71b54a676234d17fa',
			title: 'toto',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 4,
			__v: 0
		}
	]

	test('1 blog', () => {
		const result = listHelper.totalLikes(blogs.slice(0,1))
		expect(result).toBe(5)
	})

	test('0 blog', () => {
		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})

	test('3 blogs', () => {
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(10)
	})
})

describe('most likes', () => {
	const blogs = [
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
		},
		{
			_id: '5a422aa71b54a676234d17fa',
			title: 'toto',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 4,
			__v: 0
		}
	]

	test('blogs', () => {
		const result = listHelper.favoriteBlog(blogs)
		expect(result).toEqual({
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			})
	})

	test('blogs reversed', () => {

		const result = listHelper.favoriteBlog(blogs.reverse())
		expect(result).toEqual({
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			})
	})

	test('no blogs', () => {

		const result = listHelper.favoriteBlog([])
		expect(result).toBe(undefined)
	})
})
