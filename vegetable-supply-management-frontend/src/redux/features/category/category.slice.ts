import { createSlice }  from "@reduxjs/toolkit";
import initialState from "./category.selectors";
import {
    getAllCategories,
    getCategoryById,
    updateCategory
} from "./category.thunks";

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false
                state.listCategory = action.payload
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getCategoryById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.loading = false
                state.categoryDetail = action.payload
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(updateCategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false
                state.categoryDetail = action.payload
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const {

} = categorySlice.actions;

export default categorySlice.reducer;