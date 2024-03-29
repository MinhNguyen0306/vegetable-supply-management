import privateClient from "../configs/privateClient";
import publicClient from "../configs/publicClient";
import { LoginPayload, RegisterPayload } from "src/types/auth";

const authEnpoints = {
    register: (type: number) => `auth/register?type=${type}`,
    login: "auth/login",
}

const authApi = {
    login: async ({ username, password }: LoginPayload) => {
        try {
            const response = await publicClient.post(
                authEnpoints.login,
                { username, password }
            )
            .then((response) => response)
            .catch((error) => error);
            return { response }
        } catch (error) {
            return { error }
        }
    },
    register: async (type: number, { username, email, address, phone, password, confirmPassword }: RegisterPayload) => {
        try {
            const response = await publicClient.post(
                authEnpoints.register(type),
                { username, email, address, phone, password, confirmPassword, type }
            );

            return { response }
        } catch (error) {
            return { error }
        }
    }
}

export default authApi;