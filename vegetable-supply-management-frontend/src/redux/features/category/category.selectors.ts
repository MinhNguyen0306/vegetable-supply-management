import { ListCategory, Category } from "../../../types/category";

interface CategorySlice {
    loading: boolean,
    error: any
    listCategory: ListCategory,
    categoryDetail: Category
}

const initialState: CategorySlice = {
    loading: false,
    error: null,
    listCategory: {
        categories: []
    },
    categoryDetail: {
        id: 0,
        categoryName: ""
    }
}

export default initialState;