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

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer
