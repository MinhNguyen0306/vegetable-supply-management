package com.example.vegetablemanagementsupplybackend.DTO;

import com.example.vegetablemanagementsupplybackend.Entity.Mart;
import com.example.vegetablemanagementsupplybackend.Entity.OrderItem;
import com.example.vegetablemanagementsupplybackend.Enum.OrderStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private String id;
    private String description;
    private Date orderDate;
    private Date deliveryDate;
    private OrderStatusEnum orderStatus;
    private Mart mart;
    private List<OrderItem> orderItems;
}
