import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginForm } from './components/Form'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { initBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import { handleLogout } from './reducers/userReducer'
//import usersService from './services/users'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(initBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(addUser())
	}, [])


	const loginView = () => < LoginForm />
	const appView = () => {
		return (
			<div>
				<h2>blogs</h2>
				<p>{user.username} logged in <button onClick={() => dispatch(handleLogout())} >log out</button></p>
				<BlogList />
			</div>
		)}

	return (
		<div>
			<Notification />
			{user === null ? loginView() : appView()}
		</div>
	)
}

export default App
