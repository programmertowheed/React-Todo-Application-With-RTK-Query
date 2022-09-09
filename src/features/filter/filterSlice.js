import { createSlice } from "@reduxjs/toolkit";

const initialState = { status: "All", colors: [] };

// create slice
const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            state.status = action.payload;
        },
        changeColor: (state, action) => {
            if (state.colors.includes(action.payload)) {
                state.colors = state.colors.filter(
                    (existingColor) => existingColor !== action.payload
                );
            } else {
                state.colors.push(action.payload);
            }
        },
    },
});

export default filterSlice.reducer;
export const { changeStatus, changeColor } = filterSlice.actions;
