import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setNotification(state, action) {
			return state = action.payload
		},
		unsetNotification(state, action) {
			return state = null
		}
	}
})

export const notify = (message, sc) => {
	return async dispatch => {
		dispatch(setNotification(message))
		setTimeout(() => {
			dispatch(unsetNotification())
		}, sc * 1000)
	}
}

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer
