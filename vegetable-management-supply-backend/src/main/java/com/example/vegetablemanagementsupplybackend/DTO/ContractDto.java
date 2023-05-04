package com.example.vegetablemanagementsupplybackend.DTO;

import com.example.vegetablemanagementsupplybackend.Entity.Mart;
import com.example.vegetablemanagementsupplybackend.Entity.Policy;
import com.example.vegetablemanagementsupplybackend.Entity.Provider;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class ContractDto {
    private String id;
    private String nameContract;
    private String content;
    private Date requireDate;
    private Date effectiveDate;
    private Date expireDate;
    private String dailySupplyCapacity;
    private Provider provider;
    private Mart mart;
    private List<Policy> policies = new ArrayList<>();
}
