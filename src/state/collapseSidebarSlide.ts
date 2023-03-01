import { createSlice } from "@reduxjs/toolkit";

const CollapseSidebarSlice = createSlice({
    name: "collapseSidebar",
    initialState: {
        collapsed: false,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.collapsed = !state.collapsed;
        },
        openSidebar: (state) => {
            state.collapsed = false;
        },
        closeSidebar: (state) => {
            state.collapsed = true;
        },
    },
});

export const { toggleSidebar, openSidebar, closeSidebar } = CollapseSidebarSlice.actions;

export default CollapseSidebarSlice.reducer;
