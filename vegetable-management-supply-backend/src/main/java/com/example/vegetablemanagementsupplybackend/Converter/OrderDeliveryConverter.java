package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.OrderDeliveryDto;
import com.example.vegetablemanagementsupplybackend.Entity.OrderDelivery;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class OrderDeliveryConverter {
    @Autowired
    private ModelMapper modelMapper;

    public OrderDelivery dtoToOrderDelivery(OrderDeliveryDto orderDeliveryDto) {
        return modelMapper.map(orderDeliveryDto, OrderDelivery.class);
    }

    public OrderDeliveryDto orderDeliveryToDto(OrderDelivery orderDelivery) {
        return modelMapper.map(orderDelivery, OrderDeliveryDto.class);
    }
}
