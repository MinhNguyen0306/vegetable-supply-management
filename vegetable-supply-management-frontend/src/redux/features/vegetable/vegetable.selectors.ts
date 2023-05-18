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
        vegetableId: "",
        vegetableName: "",
        currentPricing: 0,
        currentStock: 0,
        certificationList: {
            certificationList: [],
            total: 0
        },
        total_certification: 0,
        unitProductList: {
            unitProductList: [],
            total: 0
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