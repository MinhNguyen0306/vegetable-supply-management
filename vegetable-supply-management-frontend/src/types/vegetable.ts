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
    vegetable: Vegetable;
    certificationList?: ICertificationList;
    total_certification?: number;
    unitProductList?: IUnitProductList;
}

export interface VegetablePayload{
    providerId: string | undefined,
    categoryId: number,
    unitId: number,
    uploadTo?: string,
    medias?: any
    vegetable: Vegetable
}