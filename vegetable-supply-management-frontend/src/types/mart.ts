export interface Mart {
    id: string | null,
    martName: string | null,
    faxCode: number | null,
}

export interface IMartPayload extends Mart {
}