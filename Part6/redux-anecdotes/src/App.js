import { useEffect } from 'react'
import AnecdotesForm from './components/AnecdotesForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initialAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initialAnecdotes())
	}, [dispatch])
	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification/>
			<Filter />
			<AnecdoteList />
			<AnecdotesForm />
		</div>
	)
}

export default App
