import { AllOrderResponse, Order, OrderDetail, OrderTemporary } from "src/types/order";

interface OrderSlice {
    loading: boolean,
    error: any,
    listOrder: AllOrderResponse,
    orderTemporary: OrderTemporary
    orderDetail: OrderDetail,
}

const initialState: OrderSlice = {
    loading: false,
    error: "",
    listOrder: {
        content: [],
        pageNumber: 0,
        pageSize: 4,
        totalElements: 0,
        totalPages: 0,
        lastPage: false
    },
    orderTemporary: {
        totalItem: 0,
        categories: [],
        totalPrice: 0,
        deliveryDate: new Date().toISOString(),
        period: "",
        orderItems: []
    },
    orderDetail: {
        id: "",
        orderDate: new Date().toISOString(),
        deliveryDate: new Date().toISOString(),
        status: "",
        mart: {
            id: "",
            martName: "",
            faxCode: 0
        },
        orderItems: []
    }
}

export default initialState;