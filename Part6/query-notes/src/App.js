import { useQuery } from 'react-query'
import axios from 'axios'

const App = () => {
	const addNote = async (event) => {
		event.preventDefault()
		const content = event.target.note.value
		event.target.note.value = ''
		console.log(content)
	}

	const toggleImportance = (note) => {
		console.log('toggle importance of', note.id)
	}

	const result = useQuery(
		'notes',
		() => axios.get('http://localhost:3001/notes').then(res => res.data)
	)

	if (result.isLoading) {
		return <div>loading data...</div>
	}

	const notes = result.data

	return(
		<div>
		<h2>Notes app</h2>
		<form onSubmit={addNote}>
		<input name="note" />
		<button type="submit">add</button>
		</form>
		{notes.map(note =>
			<li key={note.id} onClick={() => toggleImportance(note)}>
			{note.content} 
			<strong> {note.important ? 'important' : ''}</strong>
			</li>
		)}
		</div>
	)
}

export default App
