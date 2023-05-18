import { ICertificationList } from "./certification";
import { IUnitProductList } from "./unit_product";

export interface Vegetable {
    vegetableName: string;
    currentStock: number;
    currentPricing: number;
    description?: string;
}

export interface VegetableDetail {
    vegetableId: string
    vegetableName: string;
    currentStock: number;
    currentPricing: number;
    description?: string;
    certificationList?: ICertificationList;
    total_certification?: number;
    unitProductList?: IUnitProductList;
}

export interface ListVegetableResponse {
    content: VegetableDetail[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
    lastPage: boolean
}

export interface VegetablePayload{
    providerId: string | undefined,
    categoryId: number,
    unitId: number,
    uploadTo?: string,
    medias?: any
    vegetable: Vegetable
}