import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const filterItems = (arr, query) => arr.filter((el) => el.content.toLowerCase().includes(query.toLowerCase()))

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({ filter, anecdotes}) => {
		return filterItems(anecdotes, filter)
	})

	const vote = async (id) => {
		dispatch(voteFor(id))
		dispatch(setNotification(`You voted for "${anecdotes.find(a => a.id === id).content}"`))
		await sleep(3000)
		dispatch(unsetNotification())
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
