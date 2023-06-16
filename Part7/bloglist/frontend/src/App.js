import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginForm } from './components/Form'
import Notification from './components/Notification'
import Home from './components/Home'
import { initBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'

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
