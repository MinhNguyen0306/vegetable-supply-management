package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.OrderDto;
import com.example.vegetablemanagementsupplybackend.Entity.Order;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class OrderConverter {
    @Autowired
    private ModelMapper modelMapper;

    public OrderDto orderToDto(Order order) {
        return modelMapper.map(order, OrderDto.class);
    }

    public Order dtoToOrder(OrderDto orderDto) {
        return modelMapper.map(orderDto, Order.class);
    }

    public List<OrderDto> ordersToDto(List<Order> orders) {
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDto.class)).collect(Collectors.toList());
    }
}
