import { Mart } from "./mart"
import { ProviderDetail } from "./provider"

export interface Role {
    id: number,
    name: string
}

export interface User {
    id: string,
    userName: string,
    email: string,
    address: string,
    phone: string,
    provider: ProviderDetail
    mart: Mart
    roles: Role[]
}