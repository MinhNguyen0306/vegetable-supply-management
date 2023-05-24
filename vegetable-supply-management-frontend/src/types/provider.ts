import { IPerson } from './person';
import { Certification } from './certification';

export interface Provider extends IPerson{
    id_provider: string;
    active_year: number;
    production_area?: string;
    anual_output?: string;
    total_category?: number;
    logo?: string;
    cover_logo?: string;
    active_status?: string;
    certificationList: Certification[];
}

export interface ProviderList {
    providerList: Provider[];
    total?: number;
}

export interface ProviderDetail {
    id: string | null,
    annualOutput: string | null,
    productionArea: string | null,
    providerName: string | null,
    yearActive: string | null
}
