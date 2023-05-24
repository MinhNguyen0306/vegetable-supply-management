import { createSlice } from "@reduxjs/toolkit";
import { getAllUnit, getAllUnitOfVegetable } from "./unit.thunks";

const unitSlice = createSlice({
    name: "unit",
    initialState: {
        loading: false,
        error: {},
        unit: null,
        listUnit: []
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUnit.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllUnit.fulfilled, (state, action) => {
                state.loading = false
                state.listUnit = action.payload
            })
            .addCase(getAllUnit.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            
            .addCase(getAllUnitOfVegetable.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllUnitOfVegetable.fulfilled, (state, action) => {
                state.loading = false
                state.listUnit = action.payload
                console.log(action.payload)
            })
            .addCase(getAllUnitOfVegetable.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export default unitSlice.reducer;