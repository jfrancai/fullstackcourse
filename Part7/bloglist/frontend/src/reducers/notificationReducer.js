import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: { message: null, color: null },
	reducers: {
		setNotification(state, action) {
			state.message = action.payload.message
			state.color = action.payload.color
			return state
		},
		unsetNotification(state) {
			state.message = null
			state.color = null
			return state
		}
	}
})

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const notify = (message, color) => {
	return dispatch => {
		dispatch(setNotification({ message, color }))
		setTimeout(() => {
			dispatch(unsetNotification({ message: null, color: null }))
		}, 3000)
	}
}
