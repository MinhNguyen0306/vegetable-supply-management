package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.UnitDto;

import java.util.List;

public interface UnitService {
    UnitDto createUnit(String providerId, UnitDto unitDto);
    void deleteUnit(Integer unitId);
    List<UnitDto> getAllUnits();
    List<UnitDto> getAllUnitOfVegetable(String vegetableId);
}
