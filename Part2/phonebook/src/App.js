import { useState } from 'react'

const Filter = ({search, handleSearch}) => <div>filter shown with <input value={search} onChange={handleSearch}/></div>

const PersonForm = ({addPerson, newName, newNumber, setNewName, setNewNumber}) => {

	const handleSubmit = (setValue) => {
		const handler = (event) => setValue(event.target.value)
		return handler
	}

	return (
		<form onSubmit={addPerson}>
			<div> name: <input value={newName} onChange={handleSubmit(setNewName)}/> </div>
			<div> number: <input value={newNumber} onChange={handleSubmit(setNewNumber)}/> </div>
			<div> <button type="submit">add</button> </div>
		</form>
	)
}

const Persons = ({filteredPersons}) => {
	return (
		<>
		{filteredPersons.map((person) => {
			return <p key={person.name}>{person.name} {person.number}</p>
		})}
		</>
	)
}

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])
	const [filteredPersons, setFilteredPersons] = useState(persons)
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')

	const addPerson = (event) => {
		event.preventDefault() 
		if (persons.find((person) => person.name === newName) !== undefined)
		{
			window.alert(`${newName} is already added to phonebook`)
			return 
		}
		const personObj = {
			name: newName,
			number: newNumber
		}
		const newPersons = persons.concat(personObj)
		if (search === '') {
			setFilteredPersons(newPersons)
		} else {
			const result = newPersons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
			setFilteredPersons(result)
		}
		setPersons(newPersons)
		setNewName('')
		setNewNumber('')
	}

	const handleSearch = (event) => {
		const value = event.target.value
		console.log(value)
		if (value === '') {
			setFilteredPersons(persons)
		} else {
			const result = persons.filter(person => person.name.toLowerCase().includes(value.toLowerCase()))
			setFilteredPersons(result)
		}
		setSearch(value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter search={search} handleSearch={handleSearch} />
			<h2>Add new</h2>
			<PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
			<h2>Numbers</h2>
			<Persons filteredPersons={filteredPersons}/>
		</div>
	)
}


export default App
