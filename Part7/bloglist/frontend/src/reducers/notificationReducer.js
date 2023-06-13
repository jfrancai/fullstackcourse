import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: { message: null, color: null },
	reducers: {
		setNotification(state, action) {
			state.message = action.payload.message
			state.color = action.payload.color
		},
		unsetNotification(state) {
			state.message = null
			state.color = null
		}
	}
})

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const notify = (message, color) => {
	return () => {
		setNotification({ message, color })
		setTimeout(() => {
			unsetNotification({ message: null, color: null })
		})
	}
}
