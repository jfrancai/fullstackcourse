import { useState, useEffect } from 'react'
import { Persons, PersonForm, Filter } from './components/Phonebook'
import phoneServices from './services/phonebook'

const App = () => {
	const [persons, setPersons] = useState([])
	const [filteredPersons, setFilteredPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		phoneServices
			.getAll()
			.then(data => {
				setPersons(data)
				setFilteredPersons(data)
			})
	}, [])

	const updatePersons = (newPersons) => {
		if (search === '') {
			setFilteredPersons(newPersons)
		} else {
			const result = newPersons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
			setFilteredPersons(result)
		}
		setPersons(newPersons)
	}

	const addPerson = (event) => {
		event.preventDefault() 
		const personToFind = persons.find(person => person.name === newName)
		if (personToFind !== undefined)
		{
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true)
			{
				phoneServices
					.update(personToFind.id, { ...personToFind, number: newNumber })
					.then(data => {
						updatePersons(persons.map(person => person.id !== personToFind.id ? person : data))
					})
					.catch(error => {
						console.log(error)
						alert(
							`${personToFind.name} was already deleted from server`
						)
						updatePersons(persons.filter(person => person.id !== personToFind.id))
					})
				setNewName('')
				setNewNumber('')
			}
			return 
		}
		const personObj = {
			name: newName,
			number: newNumber
		}
		phoneServices
			.create(personObj)
			.then(newPerson => updatePersons(persons.concat(newPerson)))
		setNewName('')
		setNewNumber('')
	}

	const handleSearch = (event) => {
		const value = event.target.value
		if (value === '') {
			setFilteredPersons(persons)
		} else {
			const result = persons.filter(person => person.name.toLowerCase().includes(value.toLowerCase()))
			setFilteredPersons(result)
		}
		setSearch(value)
	}

	const removePerson = id => {
		return (() => {
			const personToRemove = persons.find(person => id === person.id)
			if (window.confirm(`Delete ${personToRemove.name} ?`) === false)
				return 
			phoneServices
				.remove(id)
				.catch(error => {
					console.log(error)
					alert(
						`${personToRemove.name} was already deleted from server`
					)
				})
				updatePersons(persons.filter(person => person.id !== id))
		})
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter search={search} handleSearch={handleSearch} />
			<h2>Add new</h2>
			<PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
			<h2>Numbers</h2>
			<Persons filteredPersons={filteredPersons} removePerson={removePerson}/>
		</div>
	)
}


export default App
