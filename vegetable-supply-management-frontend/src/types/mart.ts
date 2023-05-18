export interface Mart {
    id: string,
    name: string,
    address: string,
    phone: string,
    email: string,
    fax?: number,
}

export interface IMartPayload extends Mart {
}