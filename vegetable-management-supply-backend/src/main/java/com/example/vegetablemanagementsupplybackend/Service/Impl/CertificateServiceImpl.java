package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.example.vegetablemanagementsupplybackend.Converter.CertificateConverter;
import com.example.vegetablemanagementsupplybackend.DTO.CertificateDto;
import com.example.vegetablemanagementsupplybackend.Entity.Certificate;
import com.example.vegetablemanagementsupplybackend.Exception.ResourceNotFoundException;
import com.example.vegetablemanagementsupplybackend.Repository.CertificateRepository;
import com.example.vegetablemanagementsupplybackend.Service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificateServiceImpl implements CertificateService {
    @Autowired
    private CertificateRepository certificateRepository;

    private final CertificateConverter certificateConverter;

    @Override
    public CertificateDto getCertificateById(String certificateId) {
        Certificate certificate = this.certificateRepository.findById(certificateId)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate", "Id", certificateId));
        return certificateConverter.certificateToDto(certificate);
    }

    @Override
    public List<CertificateDto> getAllCertificates() {
        List<Certificate> certificates = this.certificateRepository.findAll();
        return certificateConverter.certificatesToDto(certificates);
    }

    @Override
    public void deleteCertificate(String certificateId) {
        Certificate certificate = this.certificateRepository.findById(certificateId)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate", "Id", certificateId));
        this.certificateRepository.delete(certificate);
    }
}
