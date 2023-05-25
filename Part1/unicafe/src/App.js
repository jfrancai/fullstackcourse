import { useState } from 'react'

const H1 = ({text}) => {
	return (
		<h1>{text}</h1>
	)
}

const Button = ({handleClick, text}) => {
	return (
		<button onClick={handleClick}>{text}</button>
	)
}

const StatisticLine = ({text, value}) => {
	return (<tr><td> {text} {value} </td></tr>)
}

const Statistics = ({good, bad, neutral}) => {
	const total = good + bad + neutral
	if (total === 0) {
		return (
			<>
				No feedback given
			</>
		)
	}
	const average = (good - bad) / total
	const positive = good / total 
	return  (
		<table>
			<tbody>
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={neutral} />
				<StatisticLine text="bad" value={bad} />
				<StatisticLine text="total" value={total} />
				<StatisticLine text="average" value={average} />
				<StatisticLine text="positive" value={positive} />
			</tbody>
		</table>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const addGoodFeedback = () => {
		setGood(good + 1)
	}
	
	const addBadFeedback = () => {
		setBad(bad + 1)
	}

	const addNeutralFeedback = () => {
		setNeutral(neutral + 1)
	}

	return (
		<>
			<H1 text="give feedback" />
			<Button handleClick={addGoodFeedback} text="good" />
			<Button handleClick={addNeutralFeedback} text="neutral" />
			<Button handleClick={addBadFeedback} text="bad" />

			<H1 text="statistics" />
			<Statistics good={good} bad={bad} neutral={neutral} />
		</>
	)	
}

export default App;
