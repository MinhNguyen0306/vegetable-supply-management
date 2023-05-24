import { ListVegetableResponse, VegetableDetail } from "src/types/vegetable"

interface VegetableSlice {
    loading: boolean,
    error: any,
    vegetableDetail: VegetableDetail,
    listVegetable: ListVegetableResponse
}

const initialState: VegetableSlice = {
    loading: false,
    error: "",
    vegetableDetail: {
        id: "",
        vegetableName: "",
        currentPricing: 0,
        currentStock: 0,
        lock: false,
        certificates: {
            certificationList: [],
            total: 0
        },
        unit: {
            id: 0,
            unitName: ""
        },
        category: {
            id: 0,
            categoryName: ''
        }
    },
    listVegetable: {
        content: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
        lastPage: false
    }
}

export default initialState;