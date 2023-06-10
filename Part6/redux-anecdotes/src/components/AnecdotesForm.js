import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'

const AnecdotesForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
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
