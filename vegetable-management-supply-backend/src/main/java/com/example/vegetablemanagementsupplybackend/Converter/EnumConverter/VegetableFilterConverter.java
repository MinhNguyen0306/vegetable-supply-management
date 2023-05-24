package com.example.vegetablemanagementsupplybackend.Converter.EnumConverter;

import com.example.vegetablemanagementsupplybackend.Enum.VegetableFilterEnum;
import org.springframework.core.convert.converter.Converter;

public class VegetableFilterConverter implements Converter<String, VegetableFilterEnum> {
    @Override
    public VegetableFilterEnum convert(String source) {
        try {
            return VegetableFilterEnum.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
