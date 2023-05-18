import axios, { AxiosError } from "axios";
import {AxiosRequestConfig} from "axios";
import queryString from "query-string";

const baseURL = "http://127.0.0.1:8080/api/v1/"

const privateClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
})

privateClient.interceptors.request.use(async (config): Promise<any> => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    }
})

privateClient.interceptors.response.use((response) => {
    if(response.data && response) {
        return response.data
    } 
    return response
}, (err: AxiosError) => {
    if(err.response?.data) {
        throw Promise.reject(err.response?.data)
    }
})

export default privateClient;