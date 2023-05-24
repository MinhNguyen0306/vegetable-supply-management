import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/user.slice";
import modalSlice from "./features/modal/modal.slice";
import appStateSlice from "./features/appState/appState.slice";
import categorySlice from "./features/category/category.slice";
import { useDispatch } from "react-redux";
import orderSlice from "./features/order/order.slice";
import unitSlice from "./features/unit/unit.slice";
import vegetableSlice from "./features/vegetable/vegetable.slice";

const store = configureStore({
    reducer: {
        appState: appStateSlice,
        user: userSlice,
        modal: modalSlice,
        category: categorySlice,
        unit: unitSlice,
        order: orderSlice,
        vegetable: vegetableSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;