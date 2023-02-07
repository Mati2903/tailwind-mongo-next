import { createSlice } from "@reduxjs/toolkit";

//defaultowe wartości
const initialState = {
	client: { toggleForm: false, formId: undefined, deleteId: null },
};

export const ReducerSlice = createSlice({
	name: "crudapp",
	initialState,
	reducers: {
		toggleChangeAction: (state) => {
			state.client.toggleForm = !state.client.toggleForm; //pobranie aktualnego stanu i jego zmiana na przeciwny
		},
		updateAction: (state, action) => {
			state.client.formId = action.payload; //przekażemy tutaj wartość z ID
		},
		deleteAction: (state, action) => {
			state.client.deleteId = action.payload;
		},
	},
});

export const { toggleChangeAction, updateAction, deleteAction } =
	ReducerSlice.actions;

export default ReducerSlice.reducer;
