package com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload;

import com.example.vegetablemanagementsupplybackend.DTO.VegetableDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class VegetableResponse {
    private List<VegetableDto> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean lastPage;
}
