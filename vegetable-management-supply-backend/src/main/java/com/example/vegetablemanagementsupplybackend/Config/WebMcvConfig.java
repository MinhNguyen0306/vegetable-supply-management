package com.example.vegetablemanagementsupplybackend.Config;

import com.example.vegetablemanagementsupplybackend.Converter.EnumConverter.OrderStatusConverter;
import com.example.vegetablemanagementsupplybackend.Converter.EnumConverter.ProviderStatusConverter;
import com.example.vegetablemanagementsupplybackend.Converter.EnumConverter.VegetableFilterConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMcvConfig implements WebMvcConfigurer {
    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.defaultContentType(MediaType.APPLICATION_JSON);
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new OrderStatusConverter());
        registry.addConverter(new VegetableFilterConverter());
        registry.addConverter(new ProviderStatusConverter());
    }
}
