import { TRegisterProviderStatus } from "./status";
import { User } from "./user";

type Token = {
    access_token: string,
    refresh_token: string
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: User,
    tokens: Token
}

export interface RegisterPayload {
    username: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    confirmPassword: string;
}