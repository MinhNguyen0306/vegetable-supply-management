package com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload;

import com.example.vegetablemanagementsupplybackend.DTO.OrderDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class OrderResponse {
    List<OrderDto> orderDtoList;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean lastPage;
}
