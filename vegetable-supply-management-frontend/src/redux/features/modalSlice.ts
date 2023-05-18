import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        loadingModalOpen: false,
        errorModalOpen: false,
        successModalOpen: false,
        confirmModalOpen: false,
    },
    reducers: {
        setLoadingModalOpen: (state, action) => {
            state.loadingModalOpen = action.payload
        },
        setErrorModalOpen: (state, action) => {
            state.errorModalOpen = action.payload
        },
        setSuccessModalOpen: (state, action) => {
            state.successModalOpen = action.payload
        },
        setConfirmModalOpen: (state, action) => {
            state.confirmModalOpen = action.payload
        }
    }
})

export const {
    setLoadingModalOpen,
    setErrorModalOpen,
    setSuccessModalOpen,
    setConfirmModalOpen
} = modalSlice.actions;

export default modalSlice.reducer;