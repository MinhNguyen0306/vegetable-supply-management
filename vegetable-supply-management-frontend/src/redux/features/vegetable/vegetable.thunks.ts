import { createAsyncThunk } from "@reduxjs/toolkit";
import privateClient from "src/api/configs/privateClient";
import publicClient from "src/api/configs/publicClient";
import { PageRequest } from "src/types/base";
import { ListVegetableResponse, VegetableDetail, VegetablePayload } from "src/types/vegetable";

const vegetableEndpoints = {
    create: "api/v1/vegetable",
    getAll: (
        { pageNumber, pageSize, sortBy, sortDir }: PageRequest
    ) => `vegetable?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    getAllByProvider: (
        providerId: string,
        pageNumber: number,
        pageSize: number
    ) => `vegetable/provider/${providerId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    getVegetablsOfProviderByType: (
        providerId: string,
        type: string,
        pageNumber: number,
        pageSize: number
    ) => `vegetable/provider/${providerId}/type/${type}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    getById: (vegetableId: string) => `vegetable/${vegetableId}`,
}

export const createVegetable = createAsyncThunk<
    any, 
    {
        payload: VegetablePayload
    }
>(
    "vegetable/createVegetable",
    async (
        { payload },
        thunkAPI
    ) => {
        const { categoryId, providerId, unitId, medias, uploadTo, vegetable } = payload
        let formData = new FormData();
        providerId && formData.append('providerId', providerId);
        uploadTo && formData.append('uploadTo', uploadTo);
        formData.append('vegetable', new Blob([JSON.stringify(vegetable)], {
            type: 'application/json'
        }))

        const response: any = await privateClient.post(
            vegetableEndpoints.create,
            formData, { signal: thunkAPI.signal }
        )

        return response;
    }
)

export const getAllVegetable = createAsyncThunk<
    ListVegetableResponse,
    {
        request: PageRequest
    }
>(
    "vegetable/getAllVegetable",
    async (
        { request },
        thunkAPI
    ) => {
        const { pageNumber, pageSize, sortBy, sortDir } = request

        const response: ListVegetableResponse = await publicClient.get(
            vegetableEndpoints.getAll({ pageNumber, pageSize, sortBy, sortDir }),
            { signal: thunkAPI.signal }
        )

        return response;
    }
)

export const getVegetableById = createAsyncThunk<
    VegetableDetail,
    string
>(
    "vegetable/getVegetableById",
    async (
        vegetableId,
        thunkAPI
    ) => {
        const response: VegetableDetail = await publicClient.get(
            vegetableEndpoints.getById(vegetableId),
            { signal: thunkAPI.signal }
        )

        return response;
    }
)

export const getVegetablesByProvider = createAsyncThunk<
    ListVegetableResponse,
    {
        providerId: string,
        pageNumber: number,
        pageSize: number
    }
>(
    "vegetable/getVegetablesByProvider",
    async (
        {providerId, pageNumber, pageSize}, thunkAPI
    ) => {
        const response: ListVegetableResponse = await privateClient.get(
            vegetableEndpoints.getAllByProvider(providerId, pageNumber, pageSize),
            { signal: thunkAPI.signal }
        )

        return response;
    }
)

export const getVegetablesOfProviderByType = createAsyncThunk<
    ListVegetableResponse,
    {
        providerId: string,
        type: string,
        pageNumber: number,
        pageSize: number
    }
>(
    "vegetable/getVegetablesOfProviderByType",
    async (
        { providerId, type, pageNumber, pageSize }, thukAPI
    ) => {
        const response: ListVegetableResponse = await privateClient.get(
            vegetableEndpoints.getVegetablsOfProviderByType(providerId, type, pageNumber, pageSize),
            { signal: thukAPI.signal }
        )

        return response;
    }
)