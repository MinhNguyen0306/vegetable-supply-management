import { Category, ListCategory, PayloadCategory } from "src/types/category";
import privateClient from "../configs/privateClient";
import publicClient from "../configs/publicClient";

const categoryEndpoints = {
    create: "/categories",
    getById: (categoryId: number) => `/categories/${categoryId}`,
    getAll: "/categories",
    delete: (categoryId: number) => `/categories/${categoryId}`
}

const categoryApi = {
    create: async ({ categoryName }: PayloadCategory) => {
        try {
            const { data } = await privateClient.post<Category>(
                categoryEndpoints.create,
                categoryName
            )
            
            return data 
        } catch (error) {
            return error
        }
    },
    getById: async (categoryId: number) => {
        try {
            const response = await publicClient.get<Category>(
                categoryEndpoints.getById(categoryId)
            )

            return { response }
        } catch (error) {
            return { error }
        }
    },
    getAll: async () => {
        try {
            const response = await publicClient.get(
                categoryEndpoints.getAll
            )

            return { response }
        } catch (error) {
            return { error }
        }
    },
    delete: async (categoryId: string) => {
        try {
            const response = await publicClient.get(
                categoryEndpoints.getAll
            )

            return { response }
        } catch (error) {
            return { error }
        }
    }
}

export default categoryApi;