package com.example.vegetablemanagementsupplybackend.DTO;

import com.example.vegetablemanagementsupplybackend.Entity.User;
import com.example.vegetablemanagementsupplybackend.Enum.ProviderStatusEnum;
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
    private ProviderStatusEnum status;
    private User user;
}
