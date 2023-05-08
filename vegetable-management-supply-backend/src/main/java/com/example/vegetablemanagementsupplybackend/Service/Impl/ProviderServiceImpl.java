package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.example.vegetablemanagementsupplybackend.Converter.ProviderConverter;
import com.example.vegetablemanagementsupplybackend.DTO.ProviderDto;
import com.example.vegetablemanagementsupplybackend.Entity.Provider;
import com.example.vegetablemanagementsupplybackend.Enum.ProviderStatusEnum;
import com.example.vegetablemanagementsupplybackend.Exception.ResourceNotFoundException;
import com.example.vegetablemanagementsupplybackend.Repository.ProviderRepository;
import com.example.vegetablemanagementsupplybackend.Service.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProviderServiceImpl implements ProviderService {
    @Autowired
    private ProviderRepository providerRepository;

    private final ProviderConverter converter;

    @Override
    public void resolveProviderSignup(String providerId, String typeResolve) {
        Provider provider = this.providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", "Id", providerId));
        if(provider.getStatus().equals(ProviderStatusEnum.PENDING)) {
            if(typeResolve.equalsIgnoreCase("resolve")) {
                provider.setStatus(ProviderStatusEnum.ACTIVE);
            } else {
                this.providerRepository.delete(provider);
            }
        }
    }

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
