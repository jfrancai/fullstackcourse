import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		voteFor(state, action) {
			const id = action.payload
			state.find(a => a.id === id).votes += 1
			state.sort((a, b) => a.votes < b.votes)
		},
		appendAnecdote(state, action) {
			state.push(action.payload)
			state.sort((a, b) => a.votes < b.votes)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { voteFor, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const upVoteAnecdote = anecdote => {
	return async dispatch => {
		const likedAnecdote = await anecdoteService.upvote(anecdote)
		dispatch(voteFor(likedAnecdote.id))
	}
}

export default anecdoteSlice.reducer
