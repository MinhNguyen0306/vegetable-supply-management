package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.CertificateDto;
import com.example.vegetablemanagementsupplybackend.Entity.Certificate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class CertificateConverter {
    @Autowired
    private ModelMapper modelMapper;

    public Certificate dtoToCertification(CertificateDto certificateDto) {
        return modelMapper.map(certificateDto, Certificate.class);
    }

    public CertificateDto certificationToDto(Certificate certificate) {
        return modelMapper.map(certificate, CertificateDto.class);
    }
}
