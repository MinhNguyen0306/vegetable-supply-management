package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.OrderItemDto;
import com.example.vegetablemanagementsupplybackend.Entity.OrderItem;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderItemConverter {
    @Autowired
    private ModelMapper modelMapper;

    public OrderItem dtoToOrderItem(OrderItemDto orderItemDto) {
        return modelMapper.map(orderItemDto, OrderItem.class);
    }

    public OrderItemDto orderItemToDto(OrderItem orderItem) {
        return modelMapper.map(orderItem, OrderItemDto.class);
    }
}
