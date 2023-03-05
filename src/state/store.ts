import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import collapseSidebarSlide from "./collapseSidebarSlide";
import fetchCacheSlice from "./fetchCacheSlice";
import historySlide from "./historySlide";
import watchLaterSlide from "./watchLaterSlide";

const store = configureStore({
    reducer: {
        collapseSidebar: collapseSidebarSlide,
        fetchCache: fetchCacheSlice,
        history: historySlide,
        watchLater: watchLaterSlide,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
