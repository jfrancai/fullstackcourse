import { useState } from 'react'

const Togglable = (props) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibilty = () => setVisible(!visible)
	
	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibilty}>{props.buttonLabelShow}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibilty}>{props.buttonLabelHide}</button>
			</div>
		</div>
	)
}

export default Togglable
