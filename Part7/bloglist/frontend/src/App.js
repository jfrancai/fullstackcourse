import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginForm } from './components/Form'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Blog from './components/Blog'
import { initBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import { handleLogout } from './reducers/userReducer'
import { BrowserRouter as Router,  Routes, Route, Link, useParams } from 'react-router-dom'
import usersServices from './services/users.js'

const Users = ({ users }) => {
	if (users === null) {
		return null
	}

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
								<td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
								<td>{user.blogs.length}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

const User = ({ users }) => {
	if (users === null) {
		return null
	}
	const id = useParams().id
	const user = users.find(u => u.id === id)
	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map(b => {
					return (
						<li key={b.id}>{b.title}</li>
					)
				})}
			</ul>
		</div>
	)
}

const Home = () => {
	const [users, setUsers] = useState(null)
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	useEffect(() => {
		usersServices.getAll().then(response => setUsers(response)).catch(error => console.log(error))
	}, [setUsers])


	if (user === null) {
		return null
	}
	return (
		<Router>
			<h2>blogs</h2>
			<div>
				<Link to='/blogs'>blogs</Link>
				<Link to='/users'>users</Link>
				{user.username} logged in <button onClick={() => dispatch(handleLogout())} >log out</button>
			</div>
			<Routes>
				<Route path='/blogs/:id' element={<Blog />}/>
				<Route path='/users/:id' element={<User users={users}/>}/>
				<Route path='/users' element={<Users users={users}/>}/>
				<Route path='/' element={<BlogList />}/>
				<Route path='/blogs' element={<BlogList />}/>
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
