import { createSlice } from "@reduxjs/toolkit";
import initialState from "./order.selectors";
import {
    getAllOrder,
    getOrdersByStatus,
    getOrdersrOfMart,
    getOrdersrOfMartByStatus,
    createOrder
} from "./order.thunks"

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderTemporary: (state, action) => {
            state.orderTemporary = action.payload
        },
        deleteOrderItemTemporary: (state, action) => {
            const orderItemTemps = state.orderTemporary.orderItems
            const index = action.payload
            if(orderItemTemps.length > 0) {
                const newOrderItemTemps = orderItemTemps.splice(index, 1)
                state.orderTemporary.orderItems = newOrderItemTemps
            }
        },
        clearOrderTemporary: (state, action) => {
            state.orderTemporary.orderItems = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.loading = false
                state.listOrder = action.payload
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(getOrdersByStatus.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getOrdersByStatus.fulfilled, (state, action) => {
                state.loading = false
                state.listOrder = action.payload
            })
            .addCase(getOrdersByStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(getOrdersrOfMart.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getOrdersrOfMart.fulfilled, (state, action) => {
                state.loading = false
                state.listOrder = action.payload
            })
            .addCase(getOrdersrOfMart.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(getOrdersrOfMartByStatus.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getOrdersrOfMartByStatus.fulfilled, (state, action) => {
                state.loading = false
                state.listOrder = action.payload
            })
            .addCase(getOrdersrOfMartByStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(createOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orderDetail = action.payload
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export const {
    setOrderTemporary,
    deleteOrderItemTemporary,
    clearOrderTemporary
} = orderSlice.actions

export default orderSlice.reducer;