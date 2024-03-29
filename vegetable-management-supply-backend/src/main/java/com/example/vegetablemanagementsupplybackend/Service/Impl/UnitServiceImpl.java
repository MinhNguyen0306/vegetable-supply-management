package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.example.vegetablemanagementsupplybackend.Converter.UnitConverter;
import com.example.vegetablemanagementsupplybackend.DTO.UnitDto;
import com.example.vegetablemanagementsupplybackend.Entity.Provider;
import com.example.vegetablemanagementsupplybackend.Entity.Unit;
import com.example.vegetablemanagementsupplybackend.Entity.Vegetable;
import com.example.vegetablemanagementsupplybackend.Exception.ResourceNotFoundException;
import com.example.vegetablemanagementsupplybackend.Repository.ProviderRepository;
import com.example.vegetablemanagementsupplybackend.Repository.UnitRepository;
import com.example.vegetablemanagementsupplybackend.Repository.VegetableRepository;
import com.example.vegetablemanagementsupplybackend.Service.UnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UnitServiceImpl implements UnitService {
    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private VegetableRepository vegetableRepository;
    private final UnitConverter unitConverter;

    @Override
    public UnitDto createUnit(String providerId, UnitDto unitDto) {
        Provider provider = this.providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", "Id", providerId));
        Unit unit = unitConverter.dtoToUnit(unitDto);
        Unit createdUnit = this.unitRepository.save(unit);
        return unitConverter.unitToDto(createdUnit);
    }

    @Override
    public void deleteUnit(Integer unitId) {
        Unit unit = this.unitRepository.findById(unitId)
                .orElseThrow(() -> new ResourceNotFoundException("Unit", "Id", unitId));
        this.unitRepository.delete(unit);
    }

    @Override
    public List<UnitDto> getAllUnits() {
        List<Unit> units = this.unitRepository.findAll();
        return unitConverter.unitsToDto(units);
    }

    @Override
    public List<UnitDto> getAllUnitOfVegetable(String vegetableId) {
        Vegetable vegetable = this.vegetableRepository.findById(vegetableId)
                .orElseThrow(() -> new ResourceNotFoundException("Vegetable", "Id", vegetableId));
        List<Unit> units = vegetable.getUnits();
        return unitConverter.unitsToDto(units);
    }
}
