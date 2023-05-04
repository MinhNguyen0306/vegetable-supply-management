package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.OrderDeliveryItemDto;
import com.example.vegetablemanagementsupplybackend.Entity.OrderDeliveryItem;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class OrderDeliveryItemConverter {
    @Autowired
    private ModelMapper modelMapper;

    public OrderDeliveryItem dtoToOrderDeliveryItem(OrderDeliveryItemDto orderDeliveryItemDto) {
        return modelMapper.map(orderDeliveryItemDto, OrderDeliveryItem.class);
    }

    public OrderDeliveryItemDto orderDeliveryItemToDto(OrderDeliveryItem orderDeliveryItem) {
        return modelMapper.map(orderDeliveryItem, OrderDeliveryItemDto.class);
    }
}
