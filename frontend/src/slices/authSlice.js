import { createSlice } from '@reduxjs/toolkit';

/**
 * Checks if 'userInfo' exists in localStorage, 
 * if so parses the JSON string into an object
 * else sets the initial state to null
 */
const initialState = {
	userInfo: localStorage.getItem('userInfo') 
		? JSON.parse(localStorage.getItem('userInfo')) 
		: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// Updates the state with the payload and saves it to localStorage
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem('userInfo', JSON.stringify(action.payload));
		},
		// Clears user info from state and removes it from localStorage
		logout: (state, action) => {
			state.userInfo = null;
			localStorage.removeItem('userInfo');
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;