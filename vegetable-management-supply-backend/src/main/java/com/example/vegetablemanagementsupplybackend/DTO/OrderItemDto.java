package com.example.vegetablemanagementsupplybackend.DTO;

import com.example.vegetablemanagementsupplybackend.Entity.Order;
import com.example.vegetablemanagementsupplybackend.Entity.Vegetable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {
    private String id;
    private int quantity;
    private Vegetable vegetable;
    private Order order;
}
