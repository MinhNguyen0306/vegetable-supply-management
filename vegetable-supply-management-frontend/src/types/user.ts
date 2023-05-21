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
    roles: Role[]
}