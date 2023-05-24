import { createSlice } from "@reduxjs/toolkit";
import initialState from "./appState.seletors";

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setOverlayOpen: (state, action) => {
            state.overlayOpen = action.payload
        },
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        },
        setModalLoading: (state, action) => {
            state.modalLoading = action.payload
        },
        setOrderSidebarOpen: (state, action) => {
            state.openOrderSidebar = action.payload
        },
        setOpenOrderConfirm: (state, action) => {
            state.openOrderConfirm = action.payload
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
    setErrorMessage, 
    setSuccessMessage,
    setModalLoading,
    setOrderSidebarOpen,
    setOpenOrderConfirm,
    setGlobalLoading,
    setThemeMode
} = appStateSlice.actions;

export default appStateSlice.reducer;