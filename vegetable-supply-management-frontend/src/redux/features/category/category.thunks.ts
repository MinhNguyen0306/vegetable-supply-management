import { createAsyncThunk } from "@reduxjs/toolkit";
import privateClient from "src/api/configs/privateClient";
import publicClient from "src/api/configs/publicClient";
import { Category, ListCategory } from "src/types/category";

const categoryEndpoints = {
    getAll: "categories",
    getById: (categoryId: number) => `categories/${categoryId}`,
    update: (categoryId: number, payload: Omit<Category, 'id'>) => `categories/${categoryId}`
}

export const getAllCategories = createAsyncThunk<ListCategory, void>(
    'category/getAllCategories',
    async (_, thunkAPI) => {
        const response: ListCategory = await publicClient.get(
            categoryEndpoints.getAll,
            { signal: thunkAPI.signal }
        )

        return response as ListCategory
    }
)

export const getCategoryById = createAsyncThunk<Category, number>(
    'category/getCategoryById',
    async (categoryId: number) => {
        const response = await publicClient.get(
            categoryEndpoints.getById(categoryId)
        )

        return response.data as Category
    }
)

export const updateCategory = createAsyncThunk<
    Category,
    {
        categoryId: number,
        payload: Omit<Category, 'id'>
    }
>(
    'category/updateCategory',
    async ({ categoryId, payload }) => {
        const response = await privateClient.post(
            categoryEndpoints.update(categoryId, payload),
        )

        return response.data
    }
)