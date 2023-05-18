import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "User",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            if(action.payload === null) {
                localStorage.removeItem("access_token");
            } else {
                if(action.payload.access_token) localStorage.setItem("access_token", action.payload.access_token)
            }
            state.user = action.payload
        },
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;