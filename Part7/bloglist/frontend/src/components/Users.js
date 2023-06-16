import { Link } from 'react-router-dom'

const Users = ({ users }) => {
	if (users === null) {
		return null
	}

	return (
		<div>
			<table>
				<thead>
					<tr>
						<td>
						</td>
						<td>
							blogs created
						</td>
					</tr>
				</thead>
				<tbody>
					{users.map(user => {
						return (
							<tr key={user.id}>
								<td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
								<td>{user.blogs.length}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Users
