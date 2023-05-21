import { createAsyncThunk } from "@reduxjs/toolkit";
import publicClient from "src/api/configs/publicClient";
import { LoginPayload, LoginResponse } from "src/types/auth";

const userEndpoints = {
    login: "auth/login"
}

export const login = createAsyncThunk<LoginResponse, LoginPayload>(
    "user/login",
    async(
       { username, password },
       thunkAPI 
    ) => {
        const response: LoginResponse = await publicClient.post(
            userEndpoints.login,
            { username, password, signal: thunkAPI.signal }
        ).then((response) => response).catch((error) => error)

        return response
    }
)