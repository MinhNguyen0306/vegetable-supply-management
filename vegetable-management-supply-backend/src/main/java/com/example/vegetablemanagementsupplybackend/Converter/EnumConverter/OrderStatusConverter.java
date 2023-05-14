package com.example.vegetablemanagementsupplybackend.Converter.EnumConverter;

import com.example.vegetablemanagementsupplybackend.Enum.OrderStatusEnum;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class OrderStatusConverter implements Converter<String, OrderStatusEnum> {
    @Override
    public OrderStatusEnum convert(String source) {
        try {
            return OrderStatusEnum.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
