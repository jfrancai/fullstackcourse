const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
	if (blogs.length == 0)
		return undefined
	const result = blogs.reduce((result, blog) => {
		if (blog.likes > result.likes) {
			return blog
		} else {
			return result
		}
	}, blogs[0])

	return result
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}
