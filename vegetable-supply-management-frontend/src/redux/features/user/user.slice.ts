import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "./user.selectors";
import { login } from "./user.thunks";
import { useDispatch } from "react-redux";

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            if(action.payload === null) {
                localStorage.removeItem("access_token");
            } else {
                if(action.payload.access_token) 
                    localStorage.setItem("access_token", action.payload.access_token)
            }
            state.user = action.payload.user
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        logout: (state, action) => {
            state.user = null
            state.isAuthenticated = false
            localStorage.removeItem('access_token')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                if(action.payload) {
                    const { access_token } = action.payload.tokens
                    localStorage.setItem('access_token', access_token)
                }
                state.user = action.payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export const {
    setUser ,
    setIsAuthenticated,
    logout
} = userSlice.actions;

export default userSlice.reducer;