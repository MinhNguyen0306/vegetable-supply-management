import { Category } from "./category";
import { ICertificationList } from "./certification";
import { Unit } from "./unit";

export interface Vegetable {
    vegetableName: string;
    currentStock: number;
    currentPricing: number;
    description?: string;
}

export interface Media {
    id: number,
    mediaName: string,
    url: string,
    extension: string
}

export interface VegetableDetail {
    id: string
    vegetableName: string;
    currentStock: number;
    currentPricing: number;
    description?: string;
    lock: boolean;
    certificates?: ICertificationList;
    units: Unit[];
    category: Category,
    medias?: Media[],
    
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
    providerId: string | null | undefined,
    categoryId: number | null | undefined,
    units: string[]
    uploadTo?: string,
    medias?: FileList | null
    vegetable: Vegetable
}