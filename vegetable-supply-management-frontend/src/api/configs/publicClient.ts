import axios, { AxiosError } from "axios";
import queryString from "query-string";

const baseURL = "http://127.0.0.1:8080/api/v1/"

const publicClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
})

publicClient.interceptors.request.use(async (config): Promise<any> => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
        }
    }
})

publicClient.interceptors.response.use((response) => {
    if(response.data && response) {
        return response.data
    } 
    return response
}, (err: AxiosError) => {
    if(err.response?.data) {
        throw Promise.reject(err.response.data)
    }
})

export default publicClient;