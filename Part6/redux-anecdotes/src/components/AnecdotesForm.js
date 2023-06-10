import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const AnecdotesForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))

		dispatch(notify(`New anecdote created : "${content}"`, 3))
	}

	return (
		<div>
			<form onSubmit={addAnecdote}>
				<div><input name='anecdote'/></div>
				<button type='submit'>create</button>
			</form>
			<h2>create new</h2>
		</div>
	) 
}

export default AnecdotesForm
