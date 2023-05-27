import phoneServices from '../services/phonebook'

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

const Person = ({person, removePerson}) => {
	return (
		<>
			<p>
				{person.name} {person.number}
				<button onClick={removePerson(person.id)}>remove</button>
			</p>
		</>
	)
}

const Persons = ({filteredPersons, removePerson}) => {
	return (
		<>
		{filteredPersons.map((person) => {
			return <Person key={person.name} person={person} removePerson={removePerson}/>
		})}
		</>
	)
}

export { Persons, PersonForm, Filter }
