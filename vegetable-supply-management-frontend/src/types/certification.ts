import { Provider } from "./provider";

export interface Certification extends Provider {
    id_certification: string;
    name_certification: string;
    effective_date: Date;
    period: string;
    issuer: string;
    certification_images: string[];
    product_name?: string;
    effective_status: string;
}

export interface ICertificationList {
    certificationList: Certification[];
    total?: number; 
}

export interface PayloadCertification {
    name_certification: string;
    effective_date: Date;
    period: string;
    issuer: string;
    certification_images: string[];
    effective_status: string;
    id_product?: string;
}