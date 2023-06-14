import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginForm } from './components/Form'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { initBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import { handleLogout } from './reducers/userReducer'
import { BrowserRouter as Router,  Routes, Route, Link } from 'react-router-dom'
import usersServices from './services/users.js'

const Users = () => {
	const [users, setUsers] = useState(null)

	useEffect(() => {
		usersServices.getAll().then(response => setUsers(response)).catch(error => console.log(error))
	}, [setUsers])

	if (users === null) {
		return null
	}
	console.log(users)

	return (
		<div>
			<table>
				<thead>
					<tr>
						<td>
						</td>
						<td>
							blogs created
						</td>
					</tr>
				</thead>
				<tbody>
					{users.map(user => {
						return (
							<tr key={user.id}>
								<td><Link to="/">{user.name}</Link></td>
								<td>{user.blogs.length}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

const Home = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	if (user === null) {
		return null
	}
	return (
		<Router>
			<h2>blogs</h2>
			<p>{user.username} logged in <button onClick={() => dispatch(handleLogout())} >log out</button></p>
			<Routes>
				<Route path='/users' element={<Users/>}/>
				<Route path='/' element={<BlogList />}/>
			</Routes>
		</Router>
	)
}

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(initBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(addUser())
	}, [])

	return (
		<div>
			<Notification />
			{user ? <Home /> : <LoginForm />}
		</div>
	)
}

export default App
