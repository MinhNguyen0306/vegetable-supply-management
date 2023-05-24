import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "./user.selectors";
import { getAllProviders, getProvidersByStatus, login, resolveProviderSignup } from "./user.thunks";
import { useDispatch } from "react-redux";

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            if(action.payload === null) {
                localStorage.removeItem("access_token");
            } else {
                if(action.payload.tokens) 
                    localStorage.setItem("access_token", action.payload.tokens.access_token)
            }
            state.user = action.payload.user
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        userLogout: (state, action) => {
            state.error = undefined
            state.user = initialState.user
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

            .addCase(getAllProviders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllProviders.fulfilled, (state, action) => {
                state.loading = false
                state.listProviders = action.payload
            })
            .addCase(getAllProviders.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })

            .addCase(getProvidersByStatus.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProvidersByStatus.fulfilled, (state, action) => {
                state.loading = false
                state.listProviders = action.payload
            })
            .addCase(getProvidersByStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })

            .addCase(resolveProviderSignup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(resolveProviderSignup.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(resolveProviderSignup.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })


    }
})

export const {
    setUser ,
    setIsAuthenticated,
    userLogout
} = userSlice.actions;

export default userSlice.reducer;