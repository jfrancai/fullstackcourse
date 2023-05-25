const Hello = (props) => {
	console.log(props)
	return (
		<div>
			<p>Hello {props.name}, you are {props.age} years old</p>
		</div>
	)
}
const App = () => {
	const name = 'Pierre'
	const age = 23
	return (
		<>
			<h1>Greetings</h1>
			<Hello name={name} age={age}/>
		</>
	)

}

export default App
