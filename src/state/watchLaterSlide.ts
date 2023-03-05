import { createSlice } from "@reduxjs/toolkit";
import { IVideoItem } from "../interfaces/IVideoList";

const initialState: IVideoItem[] = [];

const WatchLater = createSlice({
    name: "watchLater",
    initialState,
    reducers: {
        add: (state, action: { type: string; payload: IVideoItem }) => {
            if (state.filter((item) => item.id === action.payload.id).length > 0) {
                state.splice(
                    state.findIndex((item) => item.id === action.payload.id),
                    1
                );
            }

            state.push(action.payload);
        },
        remove: (state, action: { type: string; payload: string }) => {
            state.splice(
                state.findIndex((item) => item.id === action.payload),
                1
            );
        },
    },
});

export const { add, remove } = WatchLater.actions;

export default WatchLater.reducer;
