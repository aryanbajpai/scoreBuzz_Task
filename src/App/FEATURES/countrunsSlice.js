import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    runsCount: 0,
}

export const countRunsSlice = createSlice({
    name: 'countRuns',
    initialState,
    reducers: {
        addRuns(state, action){
            state.runsCount += action.payload;
        }
    }
});

export const {addRuns} = countRunsSlice.actions;
export default countRunsSlice.reducer;