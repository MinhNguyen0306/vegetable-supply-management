package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.ProviderDto;

import java.util.List;

public interface ProviderService {
    List<ProviderDto> getAllProvider();
    ProviderDto getProviderById(String providerId);
}
