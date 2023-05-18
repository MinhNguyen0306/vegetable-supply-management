import { createSlice } from "@reduxjs/toolkit";
import initialState from "./vegetable.selectors";
import {
    getAllVegetable,
    getVegetableById,
    createVegetable
} from "./vegetable.thunks"

const vegetableSlice = createSlice({
    name: 'vegetable',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createVegetable.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createVegetable.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(createVegetable.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(getAllVegetable.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllVegetable.fulfilled, (state, aciton) => {
                state.loading = false
                state.listVegetable = aciton.payload
            })
            .addCase(getAllVegetable.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(getVegetableById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getVegetableById.fulfilled, (state, action) => {
                state.loading = false
                state.vegetableDetail = action.payload
            })
            .addCase(getVegetableById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})