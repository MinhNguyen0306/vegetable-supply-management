package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.ProviderDto;
import com.example.vegetablemanagementsupplybackend.Entity.Provider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class ProviderConverter {
    @Autowired
    private ModelMapper modelMapper;

    public Provider dtoToProvider(ProviderDto providerDto) {
        return modelMapper.map(providerDto, Provider.class);
    }

    public ProviderDto providerToDto(Provider provider) {
        return modelMapper.map(provider, ProviderDto.class);
    }

    public List<ProviderDto> providersToDto(List<Provider> providers) {
        return providers.stream()
                .map(provider -> modelMapper.map(provider, ProviderDto.class)).collect(Collectors.toList());
    }
}
