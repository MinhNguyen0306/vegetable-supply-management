import { createSlice } from "@reduxjs/toolkit";
import initialState from "./order.selectors";
import {
    getAllOrder,
    getOrdersByStatus,
    getOrdersrOfMart,
    getOrdersrOfMartByStatus,
    createOrder,
    getOrderById,
    resolveOrder
} from "./order.thunks"
import { OrderItem } from "src/types/orderitem";

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addItemIntoOrderTemporary: (state, action) => {
            const payload = action.payload as OrderItem
            const orderItems = state.orderTemporary.orderItems as OrderItem[]
            const checkExist = orderItems.findIndex(item => item.vegetable.id === payload.vegetable.id);
            if(checkExist === -1) {
                state.orderTemporary.orderItems.push(action.payload)
                state.orderTemporary.totalItem = 
                    state.orderTemporary.orderItems.reduce((bef, aft) => bef + aft.quantity, 0)
                state.orderTemporary.totalPrice = 
                    state.orderTemporary.orderItems.reduce((bef, aft) => bef + (aft.quantity * aft.vegetable.currentPricing), 0)
                const category = payload.vegetable.category.categoryName
                if(!state.orderTemporary.categories.includes(category)) {
                    state.orderTemporary.categories.push(category)
                }
            }
        },
        deleteOrderItemTemporary: (state, action) => {
            const orderItemTemps = state.orderTemporary.orderItems
            const index = action.payload
            const newOrderItemTemps = orderItemTemps.filter((item, index) => index !== index)
            state.orderTemporary.totalItem = 
                newOrderItemTemps.reduce((bef, aft) => bef + aft.quantity, 0)
            state.orderTemporary.totalPrice = 
                newOrderItemTemps.reduce((bef, aft) => bef + (aft.quantity * aft.vegetable.currentPricing), 0)
            state.orderTemporary.categories = newOrderItemTemps.map(item => item.vegetable.category.categoryName)
            state.orderTemporary.orderItems = newOrderItemTemps
        },
        setOrderDelivaryDate: (state, action) => {
            state.orderTemporary.deliveryDate = action.payload
        },
        clearOrderTemporary: (state, action) => {
            state.orderTemporary = initialState.orderTemporary
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
            
            .addCase(getOrderById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false
                state.orderDetail = action.payload
            })
            .addCase(getOrderById.rejected, (state, action) => {
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

            .addCase(resolveOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(resolveOrder.fulfilled, (state, action) => {
                state.loading = false
                const item = state.listOrder.content.indexOf(action.payload)
                if(item) {
                    state.listOrder.content[item] = action.payload
                }
            })
            .addCase(resolveOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export const {
    addItemIntoOrderTemporary,
    deleteOrderItemTemporary,
    setOrderDelivaryDate,
    clearOrderTemporary
} = orderSlice.actions

export default orderSlice.reducer;