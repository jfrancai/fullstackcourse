import { useState } from 'react'
import PropTypes from 'prop-types'

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

Togglable.propTypes = {
	buttonLabelShow: PropTypes.string.isRequired,
	buttonLabelHide: PropTypes.string.isRequired,
}

export default Togglable
