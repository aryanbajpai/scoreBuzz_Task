import { configureStore } from "@reduxjs/toolkit";
import countRunsReducer from './FEATURES/countrunsSlice'
import { teamApi } from "./FEATURES/Api";



const store = configureStore({
    reducer: {
        runs: countRunsReducer,
        //adding server reducer to store to update STATES and perform Actions
        [teamApi.reducerPath]: teamApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(teamApi.middleware)
});

export default store;