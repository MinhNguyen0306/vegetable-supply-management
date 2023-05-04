package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.UnitDto;
import com.example.vegetablemanagementsupplybackend.Entity.Unit;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class UnitConverter {
    @Autowired
    private ModelMapper modelMapper;

    public Unit dtoToUnit(UnitDto unitDto) {
        return modelMapper.map(unitDto, Unit.class);
    }

    public UnitDto unitToDto(Unit unit) {
        return modelMapper.map(unit, UnitDto.class);
    }

    public List<UnitDto> unitsToDto(List<Unit> units) {
        return units.stream()
                .map(unit -> modelMapper.map(unit, UnitDto.class)).collect(Collectors.toList());
    }
}
