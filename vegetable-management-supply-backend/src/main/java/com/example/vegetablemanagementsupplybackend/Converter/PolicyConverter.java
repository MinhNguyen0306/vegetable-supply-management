package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.PolicyDto;
import com.example.vegetablemanagementsupplybackend.Entity.Policy;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PolicyConverter {
    @Autowired
    private ModelMapper modelMapper;

    public Policy dtoToPolicy(PolicyDto policyDto) {
        return modelMapper.map(policyDto, Policy.class);
    }

    public PolicyDto policyToDto(Policy policy) {
        return modelMapper.map(policy, PolicyDto.class);
    }
}
