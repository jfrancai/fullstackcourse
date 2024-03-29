import { useParams } from 'react-router-dom'

const User = ({ users }) => {
	if (users === null) {
		return null
	}
	const id = useParams().id
	const user = users.find(u => u.id === id)
	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map(b => {
					return (
						<li key={b.id}>{b.title}</li>
					)
				})}
			</ul>
		</div>
	)
}

export default User
