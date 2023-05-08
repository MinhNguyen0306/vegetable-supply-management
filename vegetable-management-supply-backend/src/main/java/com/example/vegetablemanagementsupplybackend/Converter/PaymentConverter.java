package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.PaymentDto;
import com.example.vegetablemanagementsupplybackend.Entity.Payment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PaymentConverter {
    @Autowired
    private ModelMapper modelMapper;

    public Payment dtoToPayment(PaymentDto paymentDto) {
        return modelMapper.map(paymentDto, Payment.class);
    }

    public PaymentDto paymentToDto(Payment payment) {
        return modelMapper.map(payment, PaymentDto.class);
    }
}
