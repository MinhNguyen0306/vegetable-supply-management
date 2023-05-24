package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.ProviderDto;
import com.example.vegetablemanagementsupplybackend.Enum.ProviderStatusEnum;

import java.util.List;

public interface ProviderService {
    void resolveProviderSignup(String providerId, String typeResolve);
    List<ProviderDto> getAllProvider();
    List<ProviderDto> getProvidesByStatus(ProviderStatusEnum status);
    ProviderDto getProviderById(String providerId);

}
