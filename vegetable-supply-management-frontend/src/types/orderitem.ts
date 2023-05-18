import { VegetableDetail } from "./vegetable";

export interface OrderItemDetail {
    id: string,
    quantity: number,
    vegetable: VegetableDetail,
}

export type OrderItem = Omit<OrderItemDetail, 'id'>
