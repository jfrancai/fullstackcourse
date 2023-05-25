import { useState } from 'react'

const Hello = ({name, age}) => {
	const bornYear = () => new Date().getFullYear() - age
	return (
		<div>
			<p>Hello {name}, you are {age} years old</p>
			<p>So you were probably born in {bornYear()}</p>
		</div>
	)
}

const Display = ({counter}) => {
	return (
		<div>{counter}</div>
	)
}

const Button = ({handleClick, text}) => {
	return (
		<button onClick={handleClick}>{text}</button>
	)
}

const App = () => {
	const [ counter, setCounter ] = useState(0)

	const increaseByOne = () => setCounter(counter + 1)
	const decreaseByOne = () => setCounter(counter - 1)
	const setToZero = () => setCounter(0)

	return (
		<>
			<Display counter={counter}/>
			<Button handleClick={increaseByOne} text={'plus'} />
			<Button handleClick={decreaseByOne} text={'minus'} />
			<Button handleClick={setToZero} text={'zero'} />
		</>
	)
}

export default App
