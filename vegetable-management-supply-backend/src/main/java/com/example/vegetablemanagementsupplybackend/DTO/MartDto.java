package com.example.vegetablemanagementsupplybackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MartDto {
    private String id;
    private String martName;
    private String faxCode;
    private List<OrderDto> orders;
    private List<ContractDto> contracts = new ArrayList<>();
}
