import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import themeModeSlice from "./features/themeModeSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import modalSlice from "./features/modalSlice";
import appStateSlice from "./features/appStateSlice";
import categorySlice from "./features/category/category.slice";
import { useDispatch } from "react-redux";
import orderSlice from "./features/order/order.slice";

const store = configureStore({
    reducer: {
        appState: appStateSlice,
        user: userSlice,
        themeMode: themeModeSlice,
        globalLoading: globalLoadingSlice,
        modal: modalSlice,
        category: categorySlice,
        order: orderSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;