import { createSlice } from "@reduxjs/toolkit";

type TInitialState = { [key: string]: any };

const initialState: TInitialState = {};

const FetchCacheSlice = createSlice({
    name: "fetchCache",
    initialState,
    reducers: {
        add: (state, action: { type: string; payload: { name: string; payload: any } }) => {
            state[action.payload.name] = action.payload.payload;

            if (Object.keys(state).length > 20) delete state[Object.keys(state)[0]];
        },
        remove: (state, action: { type: string; payload: string }) => {
            delete state[action.payload];
        },
    },
});

export const { add, remove } = FetchCacheSlice.actions;

export default FetchCacheSlice.reducer;
