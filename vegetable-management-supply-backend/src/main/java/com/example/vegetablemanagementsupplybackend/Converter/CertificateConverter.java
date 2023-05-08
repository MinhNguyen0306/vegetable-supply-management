package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.CertificateDto;
import com.example.vegetablemanagementsupplybackend.Entity.Certificate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CertificateConverter {
    @Autowired
    private ModelMapper modelMapper;

    public Certificate dtoToCertificate(CertificateDto certificateDto) {
        return modelMapper.map(certificateDto, Certificate.class);
    }

    public CertificateDto certificateToDto(Certificate certificate) {
        return modelMapper.map(certificate, CertificateDto.class);
    }

    public List<CertificateDto> certificatesToDto(List<Certificate> certificates) {
        return certificates.stream()
                .map(certificate -> modelMapper.map(certificate, CertificateDto.class)).collect(Collectors.toList());
    }
}
