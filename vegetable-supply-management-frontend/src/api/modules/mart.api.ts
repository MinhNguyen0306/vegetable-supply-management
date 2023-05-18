import { IPayloadLogin, IRegisterMart } from "src/types/auth";
import { Order } from "src/types/order";
import publicClient from "../configs/publicClient";
import privateClient from "../configs/privateClient";

const martEndpoints = {
    login: "mart/login",
    signup: "mart/signup",
    getInfo: "mart/info",
    getListMart: "marts",
    createOrder: "order"
}

const martApi = {
    login: async (payload: IPayloadLogin): Promise<any> => {
        try {
            const response = await publicClient.post(
                martEndpoints.login,
                payload
            );
            
            return { response }
        } catch(error) {
            return { error }
        }
    },
    signup: async(payload: IRegisterMart): Promise<any> => {
        try {
            const response = await publicClient.post(
                martEndpoints.signup,
                payload
            );

            return { response }
        } catch (error) {
            return { error }
        }
    },
    getInfo: async(): Promise<any> => {
        try {
            const response = await privateClient.get(martEndpoints.getInfo);

            return { response }
        } catch (error) {
            return { error }
        }
    },
    createOrder: async(payload: Order): Promise<any> => {
        try {
            const response = await privateClient.post(
                martEndpoints.createOrder,
                payload);

            return { response }
        } catch (error) {
            return { error }
        }
    }
}