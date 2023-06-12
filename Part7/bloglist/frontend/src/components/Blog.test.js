import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

	let container
	let mockLikeBlog
	let mockRemoveBlog

	const blog = {
		title: 'Testing blog component',
		url: 'test.com',
		likes: 42,
		author: 'jfrancai'
	}

	beforeEach(() => {
		mockLikeBlog = jest.fn()
		mockRemoveBlog = jest.fn()
		container = render(< Blog blog={blog} likeBlog={b => () => mockLikeBlog()} removeBlog={b => () => mockRemoveBlog} />).container
	})

	test('renders the blog\'s title, but does not render its URL, author or number of likes by default', () => {
		const element = screen.getByText('Testing blog component')
		expect(element).toBeDefined()

		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('URL, author and number of likes are shown when the button controlling the shownd details has been clicked', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('view')
		const div = container.querySelector('.togglableContent')

		expect(div).toHaveStyle('display: none')
		await user.click(button)
		expect(div).toHaveStyle('display: block')
	})

	test('like button is called twice', async () => {
		const user = userEvent.setup()
		const like = screen.getByText('like')

		await user.click(like)
		await user.click(like)

		expect(mockLikeBlog.mock.calls).toHaveLength(2)
	})
})
