import { useSelector, useDispatch } from 'react-redux'
import { upVoteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const filterItems = (arr, query) => arr.filter((el) => el.content.toLowerCase().includes(query.toLowerCase()))

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({ filter, anecdotes}) => {
		return filterItems(anecdotes, filter)
	})

	const vote = async (anecdote) => {
		dispatch(upVoteAnecdote(anecdote))
		dispatch(notify(`You voted for "${anecdotes.find(a => a.id === anecdote.id).content}"`, 3))
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
			<button onClick={() => vote(anecdote)}>vote</button>
			</div>
			</div>
		)}
		</>
	)
}

export default AnecdoteList
