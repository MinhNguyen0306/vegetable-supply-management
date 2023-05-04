package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.example.vegetablemanagementsupplybackend.Converter.ProviderConverter;
import com.example.vegetablemanagementsupplybackend.DTO.ProviderDto;
import com.example.vegetablemanagementsupplybackend.Entity.Provider;
import com.example.vegetablemanagementsupplybackend.Repository.ProviderRepository;
import com.example.vegetablemanagementsupplybackend.Service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderServiceImpl implements ProviderService {
    @Autowired
    private ProviderRepository providerRepository;
    private ProviderConverter converter;

    @Override
    public List<ProviderDto> getAllProvider() {
        List<Provider> providers = this.providerRepository.findAll();
        return converter.providersToDto(providers);
    }

    @Override
    public ProviderDto getProviderById(String providerId) {
        return null;
    }
}
