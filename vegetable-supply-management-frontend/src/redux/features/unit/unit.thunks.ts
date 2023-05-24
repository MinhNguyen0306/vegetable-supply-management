import { createAsyncThunk } from "@reduxjs/toolkit";
import publicClient from "src/api/configs/publicClient";
import { Unit } from "src/types/unit";

const unitEndpoints = {
    getAll: "units",
    getOfvegetable: (vegetableId: string) => `units/vegetable/${vegetableId}`
}

export const getAllUnit = createAsyncThunk<any, void>(
    'unit/getAllUnit',
    async(_, thunkAPI) => {
        const response = await publicClient.get(
            unitEndpoints.getAll,
            { signal: thunkAPI.signal }
        )

        return response
    }
)

export const getAllUnitOfVegetable = createAsyncThunk<any, string>(
    "unit/getAllUnitOfVegetable",
    async(vegetableId, thunkAPI) => {
        const response: Unit[] = await publicClient.get(
            unitEndpoints.getOfvegetable(vegetableId),
            { signal: thunkAPI.signal }
        )
        return response;
    }
)