package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.ProviderDto;

import java.util.List;

public interface ProviderService {
    void resolveProviderSignup(String providerId, String typeResolve);
    List<ProviderDto> getAllProvider();
    ProviderDto getProviderById(String providerId);
}
