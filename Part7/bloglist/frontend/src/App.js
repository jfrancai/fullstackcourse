import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginForm } from './components/Form'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { initBlogs } from './reducers/blogReducer'
import { addUser, setUser } from './reducers/userReducer'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(initBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(addUser())
	}, [])

	const loginForm = () => < LoginForm setUser={ (user) => dispatch(setUser(user)) } />

	const blogsList = () => <BlogList />

	return (
		<div>
			<Notification />
			{user === null ? loginForm() : blogsList()}
		</div>
	)
}

export default App
