import { createAsyncThunk } from "@reduxjs/toolkit";
import publicClient from "src/api/configs/publicClient";
import { AllOrderResponse, CreateOrderRequest, Order, OrderDetail, OrderPayload, OrderStatus } from "src/types/order";
import { ChangeStatusResponse, PageRequest } from "src/types/base";
import privateClient from "src/api/configs/privateClient";

const orderEndpoints = {
    getAll: ({ 
        pageNumber, pageSize, sortBy, sortDir }: PageRequest
    ) => `order/list/all?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    getById: (orderId: string) => `order/${orderId}`,
    filterByStatus: (
        status: OrderStatus, 
        { pageNumber, pageSize, sortBy, sortDir }: PageRequest
    ) => `order/list?status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    getAllOfMart: (
        martId: string,
        { pageNumber, pageSize, sortBy, sortDir }: PageRequest
    ) => `order/mart/${martId}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    getAllOfMartByStatus: (
        martId: string,
        status: OrderStatus,
        { pageNumber, pageSize, sortBy, sortDir }: PageRequest
    ) => `order/mart/${martId}?status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    create: (
        martId: string, 
    ) => `order?martId=${martId}`,
    resolve: (
        {orderId, typeResolve}: {orderId: string, typeResolve: OrderStatus}
    ) => `order/resolve/${orderId}?status=${typeResolve}`,
    cancel: (
        orderId: string
    ) => `order/cancel/${orderId}`,
    done: (
        providerId: string,
        orderId: string
    ) => `order/done?providerId=${providerId}&orderId=${orderId}`
}


export const getAllOrder = createAsyncThunk<
    AllOrderResponse,
    {
        request: PageRequest
    }
>(
    "order/getAllOrder",
    async (
        { request },
        thunkAPI
    ) => {
        const { pageNumber, pageSize, sortBy, sortDir } = request
        const response: AllOrderResponse = await publicClient.get(
            orderEndpoints.getAll({pageNumber, pageSize, sortBy, sortDir}),
            { signal: thunkAPI.signal }
        )

        return response;
    }
)

export const getOrderById = createAsyncThunk<
    OrderDetail,
    string
>(
    "order/getOrderById",
    async(
        orderId,
        thunkAPI
    ) => {
        const response: OrderDetail = await publicClient.get(
            orderEndpoints.getById(orderId),
            { signal: thunkAPI.signal }
        )

        return response;
    }
)

export const getOrdersByStatus = createAsyncThunk<
    AllOrderResponse,
    {
        status: OrderStatus,
        pageNumber: number,
        pageSize: number,
        sortBy: string,
        sortDir: string,
    }
>(
    "order/getOrdersByStatus",
    async (
        { status, pageNumber, pageSize, sortBy, sortDir },
        thunkAPI
    ) => {
        const response: AllOrderResponse = await publicClient.get(
            orderEndpoints.filterByStatus(status, {pageNumber, pageSize, sortBy, sortDir}),
            { signal: thunkAPI.signal }
        )

        return response
    }
)



export const getOrdersrOfMart = createAsyncThunk<
    AllOrderResponse,
    {
        martId: string,
        pageNumber: number,
        pageSize: number,
        sortBy: string,
        sortDir: string,
    }
>(
    "order/getOrdersrOfMart",
    async (
        { martId, pageNumber, pageSize, sortBy, sortDir },
        thunkAPI
    ) => {
        const response: AllOrderResponse = await publicClient.get(
            orderEndpoints.getAllOfMart(martId, { pageNumber, pageSize, sortBy, sortDir }),
            { signal: thunkAPI.signal }
        )

        return response
    }
)
export const getOrdersrOfMartByStatus = createAsyncThunk<
    AllOrderResponse,
    {
        martId: string,
        status: OrderStatus
        pageNumber: number,
        pageSize: number,
        sortBy: string,
        sortDir: string,
    }
>(
    "order/getOrdersrOfMartByStatus",
    async (
        { martId, status, pageNumber, pageSize, sortBy, sortDir },
        thunkAPI
    ) => {
        const response: AllOrderResponse = await publicClient.get(
            orderEndpoints.getAllOfMartByStatus(martId, status, { pageNumber, pageSize, sortBy, sortDir }),
            { signal: thunkAPI.signal }
        )

        return response
    }
)

export const createOrder = createAsyncThunk<
    OrderDetail,
    {
        martId: string,
        payload: OrderPayload
    }
>(
    "order/createOrder",
    async (
        { martId, payload },
    ) => {
        const response: OrderDetail = await privateClient.post(
            orderEndpoints.create(martId),
            payload
        )

        return response;
    }
)

export const resolveOrder = createAsyncThunk<
    OrderDetail, 
    {
        orderId: string,
        typeResolve: OrderStatus
    }
>(
    "order/resolveOrder",
    async (
        { orderId, typeResolve }
    ) => {
        const response: OrderDetail = await privateClient.patch(
            orderEndpoints.resolve({ orderId, typeResolve })
        )

        return response;
    }
)
