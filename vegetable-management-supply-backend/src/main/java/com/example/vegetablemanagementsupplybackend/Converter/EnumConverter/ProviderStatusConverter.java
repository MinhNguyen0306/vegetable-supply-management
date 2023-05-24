package com.example.vegetablemanagementsupplybackend.Converter.EnumConverter;

import com.example.vegetablemanagementsupplybackend.Enum.ProviderStatusEnum;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ProviderStatusConverter implements Converter<String, ProviderStatusEnum> {
    @Override
    public ProviderStatusEnum convert(String source) {
        try {
            return ProviderStatusEnum.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
