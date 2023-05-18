import { createSlice } from "@reduxjs/toolkit";
import initialState from "./appState.seletors";

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setOverlayOpen: (state, action) => {
            state.overlayOpen = action.payload
        },
        setOrderSidebarOpen: (state, action) => {
            state.openOrderSidebar = action.payload
        },
        setGlobalLoading: (state, action) => {
            state.globalLoading = action.payload
        },
        setThemeMode: (state, action) => {
            state.themeMode = action.payload
        }
    }
});

export const { 
    setOverlayOpen,
    setOrderSidebarOpen,
    setGlobalLoading,
    setThemeMode
} = appStateSlice.actions;

export default appStateSlice.reducer;