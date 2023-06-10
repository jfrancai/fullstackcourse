import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state)

	const vote = (id) => {
		dispatch(voteFor(id))
	}

	return (
		<>
		{anecdotes.map(anecdote =>
			<div key={anecdote.id}>
			<div>
			{anecdote.content}
			</div>
			<div>
			has {anecdote.votes}
			<button onClick={() => vote(anecdote.id)}>vote</button>
			</div>
			</div>
		)}
		</>
	)
}

export default AnecdoteList
