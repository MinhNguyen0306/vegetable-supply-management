import { createSlice } from "@reduxjs/toolkit";

const appStateSlice = createSlice({
    name: 'appState',
    initialState: {
        overlayOpen: false,
        openOrderSidebar: false
    },
    reducers: {
        setOverlayOpen: (state, action) => {
            state.overlayOpen = action.payload
        },
        setOrderSidebarOpen: (state, action) => {
            state.openOrderSidebar = action.payload
        }
    }
});

export const { 
    setOverlayOpen,
    setOrderSidebarOpen
} = appStateSlice.actions;

export default appStateSlice.reducer;