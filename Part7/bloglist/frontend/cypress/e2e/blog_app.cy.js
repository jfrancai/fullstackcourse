describe('Blog app', () => {
	beforeEach(() => {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'julien francais',
			username: 'jfrancai',
			password: 'sekret',
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', () => {
		cy.contains('log in to application')
		cy.contains('username')
		cy.contains('password')
		cy.contains('login')
	})

	describe('Login', () => {
		it('success with correct credentials', () => {
			cy.get('#username').type('jfrancai')
			cy.get('#password').type('sekret')
			cy.get('#login-button').click()
			cy.contains('jfrancai logged in')
		})
		
		it('fails with wrong credentials', () => {
			cy.get('#username').type('jfrancai')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()
			cy.contains('invalid username or password')
		})
	})

	describe('When logged in', () => {
		beforeEach(() => {
			cy.get('#username').type('jfrancai')
			cy.get('#password').type('sekret')
			cy.get('#login-button').click()
		})

		it('a new blog can be created and liked', () => {
			cy.contains('new blog').click()
			cy.get('#title').type('Random blog title article')
			cy.get('#author').type('Mr. random')
			cy.get('#url').type('wwww.random.url')
			cy.get('#create-blog').click()
			cy.contains('Random blog title article')
			cy.contains('view').click()
			for (let i = 0; i < 3; i++)
				cy.contains('like').click()
		})
	})
})
