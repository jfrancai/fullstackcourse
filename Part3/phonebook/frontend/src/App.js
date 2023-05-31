import { useState, useEffect } from 'react'
import { Persons, PersonForm, Filter } from './components/Phonebook'
import phoneServices from './services/phonebook'

const Notification = ({ notification }) => {
	if (notification.message === null) {
		return (null)
	}
	const style = {
		color: notification.color,
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	return (
		<div style={style} >
			{notification.message}
		</div>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [filteredPersons, setFilteredPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')
	const [notification, setNotification] = useState({
		message: null,
		color: null,
	})

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
						setNotification({message: `${personToFind.name}'s number successfully updated`, color: 'green'})
						setTimeout(() => setNotification({message: null, color: null}), 3000)
					})
					.catch(error => {
						updatePersons(persons.filter(person => person.id !== personToFind.id))
						console.log(error)
						setNotification({message: `${personToFind.name} was already deleted from the server`, color: 'red'})
						setTimeout(() => setNotification({message: null, color: null}), 3000)
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
			.then(newPerson => {
				updatePersons(persons.concat(newPerson))
				setNotification({message: `${newPerson.name}'s number successfully added`, color: 'green'})
				setTimeout(() => setNotification({message: null, color: null}), 3000)
			})
			.catch(error => {
				const errMsg = error.response.data.error
				console.log(errMsg)
				setNotification({message: `${errMsg}`, color: 'red'})
				setTimeout(() => setNotification({message: null, color: null}), 3000)
			})
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
				.then(() => {
					setNotification({message: `${personToRemove.name} successfully removed from the server`, color: 'green'})
					setTimeout(() => setNotification({message: null, color: null}), 3000)
				})
				.catch(error => {
					setNotification({message: `${personToRemove.name} was already deleted from the server`, color: 'red'})
					setTimeout(() => setNotification({message: null, color: null}), 3000)
					console.log(error)
				})
				updatePersons(persons.filter(person => person.id !== id))
		})
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notification={notification} />
			<Filter search={search} handleSearch={handleSearch} />
			<h2>Add new</h2>
			<PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
			<h2>Numbers</h2>
			<Persons filteredPersons={filteredPersons} removePerson={removePerson}/>
		</div>
	)
}


export default App
