import { createAsyncThunk } from "@reduxjs/toolkit";
import privateClient from "src/api/configs/privateClient";
import publicClient from "src/api/configs/publicClient";
import { LoginPayload, LoginResponse } from "src/types/auth";
import { Provider, ProviderStatus } from "src/types/provider";

const userEndpoints = {
    login: "auth/login",
    getAllProviders: "users/providers",
    getProvidersByStatus: (status: string) => `users/providers/status/${status}`,
    resolveProviderSignup:
     ({ providerId, typeResolve }: { providerId: string, typeResolve: string }) => `users/providers/${providerId}/${typeResolve}`
    
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

export const getAllProviders = createAsyncThunk<Provider[], void>(
    "user/getAllProviders",
    async (_, thunkAPI) => {
        const response: Provider[] = await publicClient.get(
            userEndpoints.getAllProviders,
            { signal: thunkAPI.signal }
        )

        return response
    }
)

export const getProvidersByStatus = createAsyncThunk<
    Provider[],
    string
>(
    "user/getProvidersByStatus",
    async (status, thunkAPI) => {
        const response: Provider[] = await publicClient.get(
            userEndpoints.getProvidersByStatus(status),
            { signal: thunkAPI.signal , headers: { 'content-type': 'application/json' }}, 
        )

        return response
    }
)

export const resolveProviderSignup = createAsyncThunk<any, { providerId: string, typeResolve: string }>(
    "user/resolveProviderSignup",
    async ({ providerId, typeResolve }) => {
        const response = await privateClient.put(
            userEndpoints.resolveProviderSignup({ providerId, typeResolve })
        )

        return response;
    }
)