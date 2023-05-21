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
        // orderItems: [
        //     {
        //         quantity:5,
        //         vegetable: {
        //             vegetableId: "aaaa",
        //             vegetable: {
        //                 vegetableName: "rau ca",
        //                 currentStock: 10,
        //                 currentPricing: 10,
        //             }
        //         },
        //     }
        // ]
        orderItems: []
    },
    orderDetail: {
        id: "",
        orderDate: new Date().toISOString(),
        deliveryDate: new Date().toISOString(),
        orderStatus: "",
        mart: {
            id: "",
            name: "",
            address: "",
            phone: "",
            email: "",
            fax: 0
        },
        orderItems: []
    }
}

export default initialState;