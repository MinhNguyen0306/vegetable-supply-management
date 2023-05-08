package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.CategoryDto;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.VegetableResponse;
import com.example.vegetablemanagementsupplybackend.DTO.VegetableDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VegetableService {
    VegetableDto createVegetable(String providerId, MultipartFile file, VegetableDto vegetableDto);
    VegetableDto updateVegetable(String vegetableId, VegetableDto vegetableDto);
    VegetableDto getVegetableById(String vegetableId);
    VegetableResponse getAllVegetables(
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String sortDir
    );
    void deleteVegetable(String vegetableId);
}