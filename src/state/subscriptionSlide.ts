import { createSlice } from "@reduxjs/toolkit";
import { IChannelDetails } from "../interfaces/IChannelList";

const initialState: IChannelDetails[] = [];

const SubscriptionSlide = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        add: (state, action: { type: string; payload: IChannelDetails }) => {
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

export const { add, remove } = SubscriptionSlide.actions;

export default SubscriptionSlide.reducer;
