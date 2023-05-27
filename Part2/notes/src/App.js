import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('a new note...')
	const [showAll, setShowAll] = useState(true)

	const hook = () => {
		const eventHandler = response => setNotes(response.data)
		const promise = axios .get('http://localhost:3001/notes')
		promise.then(eventHandler)
	}

	useEffect(hook, [])
	console.log('render', notes.length, 'notes')

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
			id: notes.length + 1,
		}
		setNotes(notes.concat(noteObject))
		setNewNote('')
	}

	const handleNoteChange = (event) => {
		setNewNote(event.target.value)
	}

	const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)} >
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				<ul>
					{notesToShow.map(note => 
						<Note key={note.id} note={note} />
					)}
				</ul>
				<form onSubmit={addNote}>
					<input value={newNote} onChange={handleNoteChange}/>
					<button type="submit">save</button>
				</form>
			</ul>
		</div>
	)
}
export default App