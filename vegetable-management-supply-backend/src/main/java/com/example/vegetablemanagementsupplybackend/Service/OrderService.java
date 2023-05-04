package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.OrderDto;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.ChangeStatusResponse;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.OrderResponse;
import com.example.vegetablemanagementsupplybackend.Enum.OrderStatusEnum;

import java.util.List;

public interface OrderService {
    OrderResponse getAllOrder(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
    OrderDto createOrder(String martId, OrderDto orderDto);
    ChangeStatusResponse rejectOrder(String orderId);
    ChangeStatusResponse cancelOrder(String orderId);
    OrderDto updateOrder(String orderId);
    OrderResponse filterOrderByStatus(OrderStatusEnum orderStatusEnum, Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
    OrderResponse getAllOrderOfMart(String martId, Integer pageNumber,
                                    Integer pageSize,
                                    String sortBy,
                                    String sortDir);
    OrderResponse filterOrderMartByStatus(String martId, OrderStatusEnum orderStatusEnum, Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

}
