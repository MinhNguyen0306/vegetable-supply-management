import { IPerson } from './person';
import { Certification } from './certification';
import { User } from './user';

export type ProviderStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE'

export interface Provider{
    id: string;
    providerName: string
    productionArea?: string;
    anualOutput?: string;
    logo?: string;
    cover_logo?: string;
    yearActive: string;
    status: ProviderStatus
    user: User
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
