import { Provider } from "./provider";

export interface IUnitProduct {
    id_unit: number;
    name_unit: string;
    ofProvider: Provider;
}

export interface IPayLoadUnitProduct {
    name_unit: string;
    
    id_provider: string;
}

export interface IUnitProductList {
    unitProductList: IUnitProduct[];
    total?: number;
}