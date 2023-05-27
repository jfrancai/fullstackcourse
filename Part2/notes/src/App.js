import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('a new note...')
	const [showAll, setShowAll] = useState(true)

	const hook = () => {
		noteService
			.getAll()
			.then(data => setNotes(data))
	}
	useEffect(hook, [])

	const toggleImportanceOf = (id) => {
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important: !note.important}

		noteService
			.update(id, changedNote)
			.then(data => setNotes(notes.map(n => n.id !== id ? n : data)))
			.catch(error => {
				alert(
					`the note '${note.content}' was already deleted from the server`
				)
				setNotes(notes.filter(n => n.id !== id))
			})
	}

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
			id: notes.length + 1,
		}
		noteService
			.create(noteObject)
			.then(data => {
				setNotes(notes.concat(data))
				setNewNote('')
			})
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
						<Note key={note.id} note={note} toggleImportanceOf={() => toggleImportanceOf(note.id)}/>
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
