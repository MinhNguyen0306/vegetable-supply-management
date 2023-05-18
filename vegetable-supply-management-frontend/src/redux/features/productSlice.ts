import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: "",
        units: [],
        certifications: [],
        isLoading:'',
        error: ''
    },
    reducers: {
    }
})