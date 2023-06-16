import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router,  Routes, Route, Link } from 'react-router-dom'
import BlogList from './BlogList'
import Blog from './Blog'
import User from './User'
import Users from './Users'
import { handleLogout } from '../reducers/userReducer'
import usersServices from '../services/users.js'

import { Layout, Menu } from 'antd'
const { Header } = Layout

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
		<Layout className="layour">
			<Router>
				<Header
					style={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<Menu theme="dark" mode="horizontal">
						<Menu.Item>
							<Link to='/blogs'>blogs</Link>
						</Menu.Item>

						<Menu.Item>
							<Link to='/users'>users</Link>
						</Menu.Item>
					</Menu>
				</Header>
				{user.username} logged in <button onClick={() => dispatch(handleLogout())} >log out</button>
				<Routes>
					<Route path='/blogs/:id' element={<Blog />}/>
					<Route path='/users/:id' element={<User users={users}/>}/>
					<Route path='/users' element={<Users users={users}/>}/>
					<Route path='/' element={<BlogList />}/>
					<Route path='/blogs' element={<BlogList />}/>
				</Routes>
			</Router>
		</Layout>
	)
}

export default Home
