import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const AnecdotesForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
		dispatch(setNotification(`New anecdote created : "${content}"`))
		await sleep(3000)
		dispatch(unsetNotification())
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
