export interface PageRequest {
    pageNumber?: number,
    pageSize?: number,
    sortBy?: string,
    sortDir?: string
}

export interface ChangeStatusResponse {
    message: string,
    fromStatus: string,
    toStatus: string,
}

export interface ErrorResponse {
    description: string,
    localtion: string,
    message: string,
    timestamp: number
}