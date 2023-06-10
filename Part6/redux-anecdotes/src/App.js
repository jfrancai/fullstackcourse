import AnecdotesForm from './components/AnecdotesForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification/>
			<Filter />
			<AnecdoteList />
			<AnecdotesForm />
		</div>
	)
}

export default App
