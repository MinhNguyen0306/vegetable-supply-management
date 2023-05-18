import { TRegisterProviderStatus } from "./status";


export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    confirmPassword: string;
    type?: number;
}