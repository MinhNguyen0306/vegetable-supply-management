package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.VegetableResponse;
import com.example.vegetablemanagementsupplybackend.DTO.VegetableDto;
import com.example.vegetablemanagementsupplybackend.Enum.VegetableFilterEnum;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VegetableService {
    VegetableDto createVegetable(
        String providerId,
        Integer categoryId,
        List<String> unitName,
        MultipartFile[] files,
        String uploadTo,
        VegetableDto vegetableDto
    );
    VegetableDto updateVegetable(String vegetableId, VegetableDto vegetableDto);
    VegetableDto getVegetableById(String vegetableId);
    VegetableResponse getAllVegetables(
        Integer pageNumber,
        Integer pageSize,
        String sortBy,
        String sortDir
    );
    VegetableResponse getVegetablesByProvider(
        String providerId,
        Integer pageNumber,
        Integer pageSize,
        String sortBy,
        String sortDir
    );

    VegetableResponse getVegetablesByKeySearch(
        String keySearch,
        Integer pageNumber,
        Integer pageSize,
        String sortBy,
        String sortDir
    );

    VegetableResponse getVegetablesByType(
            String providerId,
            VegetableFilterEnum type,
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String sortDir
    );

    void deleteVegetable(String vegetableId);
    void lockVegetable(String vegetableId);
}
