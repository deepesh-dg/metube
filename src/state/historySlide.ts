import { createSlice } from "@reduxjs/toolkit";
import { IVideoItem } from "../interfaces/IVideoList";

const initialState: IVideoItem[] = [];

const HistorySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        add: (state, action: { type: string; payload: IVideoItem }) => {
            if (state.filter((item) => item.id === action.payload.id).length > 0) {
                state = state.filter((item) => item.id !== action.payload.id);
            }

            state.push(action.payload);
        },
        remove: (state, action: { type: string; payload: string }) => {
            state = state.filter((item) => item.id !== action.payload);
        },
    },
});

export const { add, remove } = HistorySlice.actions;

export default HistorySlice.reducer;
