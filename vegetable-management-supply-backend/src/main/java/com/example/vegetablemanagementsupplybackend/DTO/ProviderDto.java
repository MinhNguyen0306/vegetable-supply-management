package com.example.vegetablemanagementsupplybackend.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class ProviderDto {
    private String id;

    private String providerName;

    private String productionArea;
    private String annualOutput;

    private Date yearActive;
}
