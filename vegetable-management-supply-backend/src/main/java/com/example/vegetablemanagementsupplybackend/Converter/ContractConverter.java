package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.ContractDto;
import com.example.vegetablemanagementsupplybackend.Entity.Contract;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ContractConverter {
    @Autowired
    private ModelMapper modelMapper;

    public Contract dtoToContract(ContractDto contractDto) {
        return modelMapper.map(contractDto, Contract.class);
    }

    public ContractDto contractToDto(Contract contract) {
        return modelMapper.map(contract, ContractDto.class);
    }

    public List<ContractDto> contractsToDto(List<Contract> contracts) {
        return contracts.stream()
                .map(contract -> modelMapper.map(contract, ContractDto.class)).collect(Collectors.toList());
    }
}
