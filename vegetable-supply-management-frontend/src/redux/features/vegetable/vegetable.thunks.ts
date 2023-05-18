import { createAsyncThunk } from "@reduxjs/toolkit";
import privateClient from "src/api/configs/privateClient";
import publicClient from "src/api/configs/publicClient";
import { PageRequest } from "src/types/base";
import { ListVegetableResponse, VegetableDetail, VegetablePayload } from "src/types/vegetable";

const vegetableEndpoints = {
    create: "api/v1/vegetable",
    getAll: (
        { pageNumber, pageSize, sortBy, sortDir }: PageRequest
    ) => `vegetable?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortBy=${sortDir}`,
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
        formData.append('categoryId', categoryId.toString());
        providerId && formData.append('providerId', providerId);
        formData.append('unitId', unitId.toString());
        formData.append('medias', medias);
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

        const response: ListVegetableResponse = await publicClient.post(
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