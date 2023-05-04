package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.VegetableDto;
import com.example.vegetablemanagementsupplybackend.Entity.Vegetable;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class VegetableConverter {
    @Autowired
    private ModelMapper modelMapper;

    public Vegetable dtoToVegetable(VegetableDto vegetableDto) {
        return modelMapper.map(vegetableDto, Vegetable.class);
    }

    public VegetableDto vegetableToDto(Vegetable vegetable) {
        return modelMapper.map(vegetable, VegetableDto.class);
    }

    public List<VegetableDto> vegetablesToDto(List<Vegetable> vegetables) {
        return vegetables.stream()
                .map(vegetable -> modelMapper.map(vegetable, VegetableDto.class)).collect(Collectors.toList());
    }
}
