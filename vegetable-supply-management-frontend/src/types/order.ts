import { PageRequest } from "./base";
import { Mart } from "./mart";
import { OrderItem } from "./orderitem";
import { OrderItemDetail } from "./orderitem";
import { Vegetable } from "./vegetable";

export type OrderStatus = 'PENDING' | 'RESOLVE' | 'REJECT' | 'CANCEL' | 'DONE'


export interface OrderDetail {
    id: string,
    description?: string,
    orderDate: Date | string,
    deliveryDate: Date | string,
    orderStatus: string | number,
    mart: Mart
    orderItems: OrderItemDetail[]
}

export type Order = Omit<OrderDetail, 'id'>

export interface OrderTemporary {
    orderItems: OrderItem[]
}

export interface AllOrderResponse {
    content: Order[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
    lastPage: boolean
}

export interface AllOrderRequest extends PageRequest{}

export interface OrdersByStatusRequest extends PageRequest {
    status: OrderStatus
}

export interface OrdersOfMartResquest extends PageRequest {
    martId: string
}

export interface OrderOfMartByStatusRequest extends PageRequest {
    martId: string,
    status: OrderStatus
}

export type PayloadOrder = Omit<Order, 'id'>

export interface CreateOrderRequest {
    martId: string,
    payload: PayloadOrder
}

export interface ResolveOrderRequest {
    orderId: string,
    status: OrderStatus
}

export interface CancelOrderRequest {
    orderId: string
}

export interface DoneOrderRequest {
    providerid: string,
    orderId: string
}
